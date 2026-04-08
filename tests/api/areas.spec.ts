import { test, expect } from "../../fixtures/base-fixtures";

test.describe("Areas API", () => {

  test("areas list is non-empty @smoke", async ({ apiClient }) => {
    const data = await apiClient.getAreas();

    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });

  test("area item has required fields", async ({ apiClient }) => {
    const data = await apiClient.getAreas();
    const area = data[0];

    expect(area).toHaveProperty("id");
    expect(area).toHaveProperty("name");
    expect(area).toHaveProperty("areas");
  });

  test("Russia exists in areas", async ({ apiClient }) => {
    const data = await apiClient.getAreas();
    const russia = data.find((a) => a.name.includes("Россия"));

    expect(russia).toBeDefined();
  });

  test("Saint Petersburg has id=2", async ({ apiClient }) => {
    const data = await apiClient.getAreas();
    const russia = data.find((a) => a.name.includes("Россия"));

    expect(russia).toBeDefined();

    const spb = russia!.areas.find((a) => a.id === "2");
    expect(spb).toBeDefined();
    expect(spb!.name).toContain("Санкт");
  });
});
