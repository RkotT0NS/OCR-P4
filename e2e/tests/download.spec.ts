import { test, expect } from "@playwright/test";
import { setupCoverage, tearDownCoverage } from "../coverage";

test("Allow download of resource if provided password match", async ({
  page,
  context,
}) => {
  await setupCoverage(page);

  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  await page.getByLabel("Email").fill("old-user@example.com");
  await page.getByLabel("Mot de passe").fill("Abcdefgh,123");

  await page.getByRole("button", { name: "Connexion" }).click();
  await expect(
    page.getByRole("button", { name: "Mon espace", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Mon espace", exact: true }).click();

  const firstAccessLink = page
    .getByRole("link", {
      name: "Accéder",
    })
    .first();

  const pagePromise = context.waitForEvent("page");
  await firstAccessLink.click();
  const newTab = await pagePromise;
  newTab.close();
  await page.goto(newTab.url());
  await expect(
    page.getByRole("heading", { name: "Télécharger un fichier" }),
  ).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByLabel("Mot de passe").fill("secret");
  const downloadButton = page.getByRole("button", {
    name: "download icon Télécharger",
  });
  await downloadButton.click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("stately-ai-raisedmo.png");

  await tearDownCoverage(page, test);
});
