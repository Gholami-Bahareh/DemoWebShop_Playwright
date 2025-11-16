const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',          // Directory containing test files
  fullyParallel: true,         // Run tests in files in parallel
  forbidOnly: !!process.env.CI, // Fail if test.only is left in the code
  retries: process.env.CI ? 2 : 0, // Retry failed tests only on CI
  workers: process.env.CI ? 1 : undefined, // Number of parallel workers

  reporter: [
    ['list'],                 // Terminal output
    ['html'],                 // HTML report
    ['allure-playwright']     // Allure report
  ],

  use: {
    headless: false,                  // Run browser visually
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,             // Timeout for each action
    ignoreHTTPSErrors: true,          // Ignore HTTPS errors
    screenshot: 'only-on-failure',    // Capture screenshot only on failure
    video: 'retain-on-failure',       // Record video only if test fails
    trace: 'on-first-retry',          // Collect trace on first retry for failed tests
    baseURL: 'https://demowebshop.tricentis.com', // Base URL for easier navigation
  },

  projects: [
    // {
    //   name: 'Smoke',
    //   grep: /@Smoke/,  // Run only tests marked with @Smoke
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // Optional mobile devices:
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // Optional: run local dev server before tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
