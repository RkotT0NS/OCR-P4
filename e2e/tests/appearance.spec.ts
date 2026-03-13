import { test, expect } from "@playwright/test";
import { setupCoverage, tearDownCoverage } from "../coverage";

test("Luminosity Theme User can access appearance settings and change theme", async ({
  page,
}) => {
  await setupCoverage(page);

  // Login as Luminosity Theme User
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  await page.getByLabel("Email").fill("luminosity-theme-user@example.com");
  await page.getByLabel("Mot de passe").fill("Abcdefgh,123");
  await page.getByRole("button", { name: "Connexion" }).click();

  // Wait for login success and redirect
  await expect(page.getByText("Mon espace")).toBeVisible();

  // Go to settings
  await page.goto("/settings/profile");

  // Verify "Appearance" link is visible because of luminosity-theme feature flag
  const appearanceLink = page.getByRole("link", { name: "Appearance" });
  await expect(appearanceLink).toBeVisible();

  // Click on Appearance
  await appearanceLink.click();

  // Verify we are on the appearance settings page
  // Use exact: true to avoid matching both H1 (Appearance Settings) and H3 (Appearance settings)
  await expect(
    page.getByRole("heading", { name: "Appearance settings", exact: true }),
  ).toBeVisible();

  // Verify theme switching works
  const lightButton = page.getByRole("button", { name: "Light" });
  const darkButton = page.getByRole("button", { name: "Dark" });
  const systemButton = page.getByRole("button", { name: "System" });

  await expect(lightButton).toBeVisible();
  await expect(darkButton).toBeVisible();
  await expect(systemButton).toBeVisible();

  // Initially it might be 'system' or 'light' depending on browser defaults in E2E
  // Let's switch to Dark and verify it's active
  await darkButton.click();

  // Check if 'dark' class is added to html element
  const isDark = await page.evaluate(() =>
    document.documentElement.classList.contains("dark"),
  );
  expect(isDark).toBeTruthy();

  // Switch back to Light
  await lightButton.click();
  const isLight = await page.evaluate(
    () => !document.documentElement.classList.contains("dark"),
  );
  expect(isLight).toBeTruthy();

  await tearDownCoverage(page, test);
});

test("Normal User cannot access appearance settings", async ({ page }) => {
  await setupCoverage(page);

  // Login as normal user
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  await page.getByLabel("Email").fill("new-user@example.com");
  await page.getByLabel("Mot de passe").fill("Abcdefgh,123");
  await page.getByRole("button", { name: "Connexion" }).click();
  await expect(page).toHaveURL(
    (url) => url.pathname === "/" || url.pathname === "/dashboard",
  );

  if (new URL(page.url()).pathname === "/") {
    await expect(page.getByRole("button", { name: "Mon espace" })).toBeVisible({
      timeout: 15000,
    });
  }

  // Go to settings
  await page.goto("/settings/profile");

  // Verify "Appearance" link is NOT visible
  const appearanceLink = page.getByRole("link", { name: "Appearance" });
  await expect(appearanceLink).not.toBeVisible();

  // Attempting to visit appearance directly should redirect to profile
  await page.goto("/settings/appearance");
  await page.waitForURL("**/settings/profile");
  await expect(
    page.getByRole("heading", { name: "Profile settings" }),
  ).toBeVisible();

  await tearDownCoverage(page, test);
});
