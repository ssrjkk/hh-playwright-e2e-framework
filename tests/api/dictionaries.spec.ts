import { test, expect } from "../../fixtures/base-fixtures";

test.describe("Dictionaries API", () => {

  test("dictionaries returns 200 with required keys @smoke", async ({ apiClient }) => {
    const response = await apiClient.getDictionaries();

    expect(response).toHaveProperty("experience");
    expect(response).toHaveProperty("employment");
    expect(response).toHaveProperty("schedule");
    expect(response).toHaveProperty("vacancy_type");
  });

  test("experience items have id and name", async ({ apiClient }) => {
    const data = await apiClient.getDictionaries();

    for (const item of data.experience) {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(typeof item.id).toBe("string");
      expect(typeof item.name).toBe("string");
    }
  });

  test("known experience ids exist", async ({ apiClient }) => {
    const data = await apiClient.getDictionaries();
    const ids = data.experience.map((e) => e.id);

    expect(ids).toContain("noExperience");
    expect(ids).toContain("between1And3");
    expect(ids).toContain("between3And6");
  });

  test("employment items are non-empty", async ({ apiClient }) => {
    const data = await apiClient.getDictionaries();

    expect(data.employment.length).toBeGreaterThan(0);
  });
});
