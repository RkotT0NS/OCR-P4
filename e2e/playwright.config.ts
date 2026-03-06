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
            entry.url.includes("localhost") &&
            !entry.url.includes("node_modules"),
          sourceFilter: (sourcePath: string) =>
            sourcePath.includes("figma/implementation/src") ||
            (sourcePath.includes("resources/js") &&
              !sourcePath.includes("laravel/")),
          reports: ["v8", "console-summary", "lcovonly", "html", "lcov"],
          outputDir: "./coverage",
        },
      },
    ],
  ],
  // reporter: 'html',
  use: {
    baseURL: "http://localhost:8001",
    trace: "on-first-retry",
    storageState: {
      cookies: [
        {
          name: "E2E_COVERAGE",
          value: "1",
          domain: "localhost", // Update this to match your local Laravel domain!
          path: "/",
          expires: Math.trunc((Date.now() + 1000 * 60 * 60 * 24 * 365) / 1000),
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
        },
      ],
      origins: [],
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
