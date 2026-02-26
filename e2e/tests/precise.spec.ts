import { test, expect, Page, TestInfo } from "@playwright/test";
import { addCoverageReport } from "monocart-reporter";
function setupCoverage(page: Page) {
  return Promise.all([
    page.coverage.startJSCoverage({
      resetOnNavigation: false,
    }),
    page.coverage.startCSSCoverage({
      resetOnNavigation: false,
    }),
  ]);
}
async function tearDownCoverage(page: Page, test: { info: () => TestInfo }) {
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage(),
  ]);

  await addCoverageReport([...jsCoverage, ...cssCoverage], test.info());
}
test("homepage has title and navigation works", async ({ page }) => {
  // 1. Start coverage
  await setupCoverage(page);

  await page.goto("/");

  // console.log(await page.content());
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DataShare/);

  await page.getByText("Se connecter").click();
  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  await tearDownCoverage(page, test);
});

test("After successful login, a button leading to the dashboard should be visible", async ({
  page,
}) => {
  // 1. Start coverage
  await setupCoverage(page);

  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  await page.getByLabel("Email").fill("someone@somewhere.net");
  await page.getByLabel("Mot de passe").fill("Abcdefgh,123");

  await page.getByRole("button", { name: "Connexion" }).click();

  await expect(page.getByRole("button", { name: "Mon espace" })).toBeVisible();

  await page.getByRole("button", { name: "Mon espace" }).click();

  await expect(
    page.getByRole("button", { name: "Charger plus" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Charger plus" }).click();

  // this test will break as soon as the user will have more than 20 uploads
  await expect(
    page.getByRole("button", { name: "Charger plus" }),
  ).not.toBeVisible();
  await tearDownCoverage(page, test);
});
