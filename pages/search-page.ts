import { Page, Locator, expect } from "@playwright/test";

export class SearchPage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly vacancyCards: Locator;
  readonly resultsCount: Locator;
  readonly salaryFilter: Locator;

  constructor(private page: Page) {
    this.searchInput = page.locator("[data-qa='search-input']");
    this.searchButton = page.locator("[data-qa='search-button']");
    this.vacancyCards = page.locator("[data-qa='vacancy-serp__vacancy']");
    this.resultsCount = page.locator("[data-qa='vacancies-total-found']");
    this.salaryFilter = page.locator("[data-qa='vacancies-filter-salary']");
  }

  async goto(): Promise<void> {
    await this.page.goto("/search/vacancy");
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async getVacancyCount(): Promise<number> {
    return this.vacancyCards.count();
  }

  async getFirstVacancyTitle(): Promise<string> {
    return this.vacancyCards.first().locator("[data-qa='serp-item__title']").innerText();
  }

  async waitForResults(): Promise<void> {
    await expect(this.vacancyCards.first()).toBeVisible({ timeout: 10000 });
  }
}
