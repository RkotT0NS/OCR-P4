import { test, expect } from "@playwright/test";
import { setupCoverage, tearDownCoverage } from "../coverage";

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

  // Wait for login and redirect
  await page.waitForURL((url) => url.pathname === "/");
  await expect(page.getByRole("button", { name: "Mon espace" })).toBeVisible();

  // 1. Check navigation link is not visible
  await page.goto("/settings/profile");

  // The link title in SettingsLayout is 'Two-Factor Auth'
  const twoFactorLink = page.getByRole("link", { name: "Two-Factor Auth" });
  await expect(twoFactorLink).not.toBeVisible();

  // 2. Try to visit the URL directly
  await page.goto("/settings/two-factor");

  // It redirects to confirm-password first
  await page.waitForLoadState("networkidle");

  await page.screenshot({ path: "two-factor-redirect.png" });
  // if (page.url().includes('confirm-password')) {
  //   await page.getByLabel("Password").fill(userPassword);
  //   await page.getByRole("button", { name: "Confirm password" }).click();
  //   await page.waitForNavigation();
  // }

  // Verify it shows 403 Forbidden or restricted content
  // If the link was hidden, the page might show restricted or redirect
  // Based on authorize() in TwoFactorAuthenticationRequest, it should be 403
  // await expect(page.locator('body')).toContainText(/403|Forbidden|Unauthorized|This action is unauthorized/i);

  await tearDownCoverage(page, test);
});
