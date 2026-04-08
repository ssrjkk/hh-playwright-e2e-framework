import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 1,
  workers: 2,
  reporter: [["html", { outputFolder: "playwright-report" }], ["list"]],
  timeout: 30000,

  use: {
    baseURL: "https://hh.ru",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
    extraHTTPHeaders: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    },
  },

  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "api",
      testMatch: "**/api/**/*.spec.ts",
    },
  ],
});
