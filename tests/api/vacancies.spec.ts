import { test, expect } from "../../fixtures/base-fixtures";
import { SEARCH_QUERIES, AREAS, EXPERIENCE, PAGINATION } from "../../test-data/search-queries";

test.describe("Vacancies API", () => {

  test("search returns 200 and items list @smoke", async ({ apiClient }) => {
    const response = await apiClient.getVacanciesRaw({
      text: SEARCH_QUERIES.qa,
      area: AREAS.spb,
      per_page: 10,
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("items");
    expect(data).toHaveProperty("found");
    expect(Array.isArray(data.items)).toBeTruthy();
    expect(data.items.length).toBeGreaterThan(0);
  });

  test("vacancy item has required fields", async ({ apiClient }) => {
    const data = await apiClient.getVacancies({
      text: SEARCH_QUERIES.qa,
      area: AREAS.spb,
      per_page: 5,
    });

    expect(data.items.length).toBeGreaterThan(0);

    const item = data.items[0];
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("name");
    expect(item).toHaveProperty("employer");
    expect(item).toHaveProperty("area");
    expect(item).toHaveProperty("salary");
  });

  for (const perPage of PAGINATION.perPage) {
    test(`per_page=${perPage} is respected`, async ({ apiClient }) => {
      const data = await apiClient.getVacancies({
        text: SEARCH_QUERIES.python,
        per_page: perPage,
      });

      expect(data.items.length).toBeLessThanOrEqual(perPage);
    });
  }

  test("search by SPb area returns results @smoke", async ({ apiClient }) => {
    const data = await apiClient.getVacancies({
      text: SEARCH_QUERIES.qa,
      area: AREAS.spb,
      per_page: 5,
    });

    expect(data.items.length).toBeGreaterThan(0);
  });

  test("search by Moscow area returns results", async ({ apiClient }) => {
    const data = await apiClient.getVacancies({
      text: SEARCH_QUERIES.qa,
      area: AREAS.moscow,
      per_page: 5,
    });

    expect(data.items.length).toBeGreaterThan(0);
  });

  test("get vacancy by id returns correct data @smoke", async ({ apiClient }) => {
    const list = await apiClient.getVacancies({
      text: SEARCH_QUERIES.qa,
      per_page: 1,
    });

    expect(list.items.length).toBeGreaterThan(0);
    const id = list.items[0].id;

    const detail = await apiClient.getVacancy(id);

    expect(detail.id).toBe(id);
    expect(detail).toHaveProperty("description");
    expect(detail).toHaveProperty("experience");
    expect(detail).toHaveProperty("key_skills");
  });

  test("non-existent vacancy returns 404", async ({ apiClient }) => {
    const response = await apiClient.getVacancyRaw("000000000");
    expect(response.status()).toBe(404);
  });

  test("experience filter works", async ({ apiClient }) => {
    const data = await apiClient.getVacancies({
      text: SEARCH_QUERIES.qa,
      experience: EXPERIENCE.noExperience,
      per_page: 5,
    });

    expect(data).toHaveProperty("items");
    expect(data).toHaveProperty("found");
  });

  test("response time is under 3000ms", async ({ request }) => {
    const start = Date.now();
    const response = await request.get("https://api.hh.ru/vacancies", {
      params: { text: "QA", per_page: 5 },
    });
    const elapsed = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(elapsed).toBeLessThan(3000);
  });
});
