import { test, expect } from "../../fixtures/base-fixtures";

test.describe("Integration: Search Flow", () => {

  test("search vacancy then get its detail @smoke", async ({ apiClient }) => {
    const list = await apiClient.getVacancies({
      text: "QA automation",
      area: "2",
      per_page: 5,
    });

    expect(list.items.length).toBeGreaterThan(0);

    const id = list.items[0].id;
    const name = list.items[0].name;

    const detail = await apiClient.getVacancy(id);

    expect(detail.id).toBe(id);
    expect(detail.name).toBe(name);
    expect(detail).toHaveProperty("description");
  });

  test("area id from areas endpoint works in vacancy search", async ({ apiClient }) => {
    const areas = await apiClient.getAreas();
    const russia = areas.find((a) => a.name.includes("Россия"));
    expect(russia).toBeDefined();

    const spb = russia!.areas.find((a) => a.id === "2");
    expect(spb).toBeDefined();

    const vacancies = await apiClient.getVacancies({
      text: "tester",
      area: spb!.id,
      per_page: 3,
    });

    expect(vacancies).toHaveProperty("items");
  });

  test("experience from dictionaries works as vacancy filter", async ({ apiClient }) => {
    const dicts = await apiClient.getDictionaries();
    const expId = dicts.experience[0].id;

    const vacancies = await apiClient.getVacancies({
      text: "QA",
      experience: expId,
      per_page: 5,
    });

    expect(vacancies).toHaveProperty("items");
    expect(vacancies).toHaveProperty("found");
  });
});
