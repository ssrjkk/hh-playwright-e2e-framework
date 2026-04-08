import { test as base, APIRequestContext } from "@playwright/test";
import { HHApiClient } from "../helpers/api-client";
import { SearchPage } from "../pages/search-page";
import { VacancyPage } from "../pages/vacancy-page";

type HHFixtures = {
  apiClient: HHApiClient;
  searchPage: SearchPage;
  vacancyPage: VacancyPage;
};

export const test = base.extend<HHFixtures>({
  apiClient: async ({ request }, use) => {
    await use(new HHApiClient(request));
  },

  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },

  vacancyPage: async ({ page }, use) => {
    await use(new VacancyPage(page));
  },
});

export { expect } from "@playwright/test";
