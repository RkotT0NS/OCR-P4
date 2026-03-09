import { test, expect } from "@playwright/test";
import { setupCoverage, tearDownCoverage } from "../coverage";
import * as OTPAuth from "otpauth";

test("Two Factor Authentication feature is not visible in profile settings without feature flag", async ({
  page,
}) => {
  await setupCoverage(page);

  // Login as a user who doesn't have the feature flag (new-user)
  const userEmail = "new-user@example.com";
  const userPassword = "Abcdefgh,123";
  await page.goto("/login");
  await page.getByLabel("Email").fill(userEmail);
  await page.getByLabel("Mot de passe").fill(userPassword);
  await page.locator('[data-test="login-button"]').click();

  await page.waitForURL((url) => url.pathname === "/");
  await expect(page.getByRole("button", { name: "Mon espace" })).toBeVisible();

  await page.goto("/settings/profile");

  // The link title in SettingsLayout is 'Two-Factor Auth'
  const twoFactorLink = page.getByRole("link", { name: "Two-Factor Auth" });
  await expect(twoFactorLink).not.toBeVisible();

  await tearDownCoverage(page, test);
});

test("Two Factor Authenticated User can activate 2FA and login with code", async ({
  page,
}) => {
  test.setTimeout(60000);
  await setupCoverage(page);

  const userEmail = "two-factor-authenticated-user@example.com";
  const userPassword = "Abcdefgh,123";

  await page.goto("/login");
  await page.getByLabel("Email").fill(userEmail);
  await page.getByLabel("Mot de passe").fill(userPassword);
  await page.locator('[data-test="login-button"]').click();

  await page.waitForURL((url) => url.pathname === "/");
  await expect(page.getByRole("button", { name: "Mon espace" })).toBeVisible();

  // 1. Check navigation link is not visible
  await page.goto("/settings/profile");

  // The link title in SettingsLayout is 'Two-Factor Auth'
  const twoFactorLink = page.getByRole("link", { name: "Two-Factor Auth" });
  await expect(twoFactorLink).toBeVisible();

  // 2. Try to visit the URL directly
  await page.goto("/settings/two-factor");

  // It redirects to confirm-password first
  await page.waitForLoadState("networkidle");

  await page.getByLabel("Password").fill(userPassword);
  await page.getByRole("button", { name: "Confirm password" }).click();

  // Wait for either the 2FA page or the password confirmation page
  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("heading", {
      name: "Two-Factor Authentication",
      exact: true,
    }),
  ).toBeVisible();
  // await expect(page.getByText("Disabled")).toBeVisible();

  // 3. Enable 2FA
  await page.getByRole("button", { name: "Enable 2FA" }).click();

  // Modal should appear
  await expect(
    page.getByRole("heading", { name: "Enable Two-Factor Authentication" }),
  ).toBeVisible();

  // Get manual setup key
  const manualKeyInput = page.locator("input[readonly]");
  await expect(manualKeyInput).toBeVisible();
  const secret = await manualKeyInput.getAttribute("value");
  expect(typeof secret).toBe("string");

  // Setup TOTP Code generator
  const totp = new OTPAuth.TOTP({
    issuer: "DataShare",
    label: userEmail,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: secret as string,
  });

  // Click Continue to go to verification step
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(
    page.getByRole("heading", { name: "Verify Authentication Code" }),
  ).toBeVisible();
  const code = totp.generate();
  const otpInputConfirm = page.locator('input[name="code"]');
  await otpInputConfirm.focus();
  await otpInputConfirm.fill(code);
  await page.getByRole("button", { name: "Confirm" }).click();

  // Modal should close and 2FA should be Enabled
  await expect(page.getByText("Enabled", { exact: true })).toBeVisible();

  // 5. Logout
  const userMenuButton = page.locator('[data-test="sidebar-menu-button"]');
  await expect(userMenuButton).toBeVisible();
  await userMenuButton.click();
  await page.locator('[data-test="logout-button"]').click();

  // Wait for redirect to home or login page
  await page.waitForURL(/$|\/login/);
  if (!page.url().includes("login")) {
    await page.goto("/login");
  }

  // 6. Login again to verify 2FA challenge
  await page.getByLabel("Email").fill(userEmail);
  await page.getByLabel("Mot de passe").fill(userPassword);
  await page.locator('[data-test="login-button"]').click();

  // Should be redirected to 2FA challenge
  await expect(
    page.getByRole("heading", { name: "Authentication Code" }),
  ).toBeVisible();

  // 7. Enter new code
  // Wait until we have a DIFFERENT code than the one used for confirmation
  // to avoid replay protection rejection.
  let newCode = totp.generate();
  while (newCode === code) {
    await page.waitForTimeout(10000);
    newCode = totp.generate();
  }

  const otpInput = page.locator('input[name="code"]');
  await otpInput.focus();
  await otpInput.pressSequentially(newCode, { delay: 50 });
  await page.getByRole("button", { name: "Continue" }).click();

  // Should be logged in
  // After 2FA, the app should redirect to dashboard or home
  await expect(page).toHaveURL(
    (url) => url.pathname === "/" || url.pathname === "/dashboard",
  );

  // await page.screenshot({ path: "two-factor-done.png" });
  // Verify user is logged in by checking for 'Mon espace' button
  if (new URL(page.url()).pathname === "/") {
    await expect(page.getByRole("button", { name: "Mon espace" })).toBeVisible({
      timeout: 15000,
    });
  }

  await tearDownCoverage(page, test);
});
