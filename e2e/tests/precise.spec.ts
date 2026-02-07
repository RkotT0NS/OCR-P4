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

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DataShare/);

  await page.getByText("Se connecter").click();
  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  await tearDownCoverage(page, test);
});
