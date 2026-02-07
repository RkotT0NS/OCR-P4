import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    [
      "monocart-reporter",
      {
        name: "DataShare E2E Report",
        outputFile: "./test-results/report.html",
        coverage: {
          all: {
            dir: "../laravel/resources/js",
            filter: {
              "**/*.{js,ts,tsx}": true,
            },
          },
          entryFilter: (entry: any) =>
            entry.url.includes("localhost") && !entry.url.includes("node_modules"),
          sourceFilter: (sourcePath: string) =>
            sourcePath.includes("resources/js") ||
            sourcePath.includes("laravel/resources/js"),
          reports: ["v8", "console-summary", "lcovonly", "html"],
          outputDir: "./coverage",
        },
      },
    ],
  ],
  // reporter: 'html',
  use: {
    baseURL: "http://localhost:8000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
