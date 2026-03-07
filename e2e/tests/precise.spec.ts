import { test, expect } from "@playwright/test";
import { setupCoverage, tearDownCoverage } from "../coverage";

test("homepage has title and navigation works", async ({ page }) => {
  await setupCoverage(page);

  await page.goto("/");

  await expect(page).toHaveTitle(/DataShare/);

  await page.getByText("Se connecter").click();
  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  await tearDownCoverage(page, test);
});

test("After successful login, a button leading to the dashboard should be visible", async ({
  page,
}) => {
  await setupCoverage(page);

  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Mot de passe").fill("Abcdefgh,123");

  await page.getByRole("button", { name: "Connexion" }).click();

  await expect(page.getByRole("button", { name: "Mon espace" })).toBeVisible();

  await page.getByRole("button", { name: "Mon espace" }).click();

  await expect(page.getByText("Aucun fichier partagé.")).toBeVisible();

  await tearDownCoverage(page, test);
});
