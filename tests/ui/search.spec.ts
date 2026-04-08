import { test, expect } from "../../fixtures/base-fixtures";

test.describe("Search UI", () => {

  test("search page loads @smoke", async ({ searchPage }) => {
    await searchPage.goto();
    await expect(searchPage.searchInput).toBeVisible();
    await expect(searchPage.searchButton).toBeVisible();
  });

  test("search returns vacancy cards", async ({ searchPage }) => {
    await searchPage.goto();
    await searchPage.search("QA engineer");
    await searchPage.waitForResults();

    const count = await searchPage.getVacancyCount();
    expect(count).toBeGreaterThan(0);
  });

  test("vacancy card title is visible after search", async ({ searchPage }) => {
    await searchPage.goto();
    await searchPage.search("QA automation Python");
    await searchPage.waitForResults();

    const title = await searchPage.getFirstVacancyTitle();
    expect(title.length).toBeGreaterThan(0);
  });
});
