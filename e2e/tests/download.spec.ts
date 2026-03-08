import { test, expect } from "@playwright/test";
import { setupCoverage, tearDownCoverage } from "../coverage";

test("Allow download of resource if provided password match", async ({
  page,
  context,
}) => {
  await setupCoverage(page);

  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Mot de passe").fill("Abcdefgh,123");

  await page.getByRole("button", { name: "Connexion" }).click();

  await expect(page.getByRole("button", { name: "Mon espace" })).toBeVisible();

  await page.getByRole("button", { name: "Mon espace" }).click();

  const firstAccessLink = page
    .getByRole("link", {
      name: "Accéder",
    })
    .first();
  console.log(page.url());
  console.log(await firstAccessLink.getAttribute("href"));

  const pagePromise = context.waitForEvent("page");
  await firstAccessLink.click();
  const newTab = await pagePromise;
  console.log(newTab.url());
  newTab.close();
  await page.goto(newTab.url());
  await expect(
    page.getByRole("heading", { name: "Télécharger un fichier" }),
  ).toBeVisible();

  await page.getByLabel("Mot de passe").fill("bingo");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Télécharger" }).click();
  // 4. Wait for the download process to initiate and complete
  const download = await downloadPromise;

  // 5. Verification
  console.log("Suggested filename:", download.suggestedFilename());

  await tearDownCoverage(page, test);
});
