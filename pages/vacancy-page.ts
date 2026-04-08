import { Page, Locator, expect } from "@playwright/test";

export class VacancyPage {
  readonly title: Locator;
  readonly employerName: Locator;
  readonly salary: Locator;
  readonly description: Locator;
  readonly applyButton: Locator;

  constructor(private page: Page) {
    this.title = page.locator("[data-qa='vacancy-title']");
    this.employerName = page.locator("[data-qa='vacancy-company-name']");
    this.salary = page.locator("[data-qa='vacancy-salary']");
    this.description = page.locator("[data-qa='vacancy-description']");
    this.applyButton = page.locator("[data-qa='vacancy-response-link-top']");
  }

  async goto(id: string): Promise<void> {
    await this.page.goto(`/vacancy/${id}`);
  }

  async waitForLoad(): Promise<void> {
    await expect(this.title).toBeVisible({ timeout: 10000 });
  }

  async getTitle(): Promise<string> {
    return this.title.innerText();
  }

  async isApplyButtonVisible(): Promise<boolean> {
    return this.applyButton.isVisible();
  }
}
