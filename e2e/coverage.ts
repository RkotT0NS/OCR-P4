import type { Page, TestInfo } from "@playwright/test";
import { addCoverageReport } from "monocart-reporter";
export function setupCoverage(page: Page) {
  return Promise.all([
    page.coverage.startJSCoverage({
      resetOnNavigation: false,
    }),
    page.coverage.startCSSCoverage({
      resetOnNavigation: false,
    }),
  ]);
}
export async function tearDownCoverage(
  page: Page,
  test: { info: () => TestInfo },
) {
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage(),
  ]);

  await addCoverageReport([...jsCoverage, ...cssCoverage], test.info());
}
