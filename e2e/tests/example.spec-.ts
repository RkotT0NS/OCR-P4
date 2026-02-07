import { test, expect } from "@playwright/test";
// import v8toIstanbul from "v8-to-istanbul";
//
import { writeFileSync } from "fs";
test("homepage has title", async ({ page }) => {
  // 1. Start coverage recording
  //
  // the path to the original source-file is required, as its contents are
  // used during the conversion algorithm.
  // const converter = v8toIstanbul("./path-to-instrumented-file.js");
  // await converter.load(); // this is required due to async file reading.
  // provide an array of coverage information in v8 format.
  await page.coverage.startJSCoverage({
    resetOnNavigation: false,
    reportAnonymousScripts: true,
  });
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DataShare/);
  await page.getByText("Se connecter").click();

  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();

  // 3. Stop coverage and get results
  const coverage = await page.coverage.stopJSCoverage();
  writeFileSync("./v8-coverage/report.json", JSON.stringify(coverage));
  // Attach to monocart-reporter
  await test.info().attach("v8-coverage", {
    body: JSON.stringify(coverage),
    contentType: "application/json",
  });
});

interface ExtractedMetric {
  url: string;
  scriptId: string;
  source?: string | undefined;
  functions: {
    functionName: string;
    isBlockCoverage: boolean;
    ranges: {
      count: number;
      startOffset: number;
      endOffset: number;
    }[];
  }[];
}
export function displayRawMetrics(coverage: ExtractedMetric[]) {
  // 4. Process the data
  for (const entry of coverage) {
    const usedBytes = entry.functions.reduce((sum, func) => {
      return (
        sum +
        func.ranges.reduce(
          (rSum, range) => rSum + (range.endOffset - range.startOffset),
          0,
        )
      );
    }, 0);
    if (typeof entry?.source === "string" && entry.source.length > 0) {
      console.log(
        `File: ${entry.url} | Usage: ${((usedBytes / entry.source.length) * 100).toFixed(2)}%`,
      );
    }
  }
}
