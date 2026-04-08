import { APIRequestContext } from "@playwright/test";

export interface VacancyItem {
  id: string;
  name: string;
  employer: { name: string };
  area: { id: string; name: string };
  salary: { from: number | null; to: number | null; currency: string } | null;
}

export interface VacancyList {
  items: VacancyItem[];
  found: number;
  pages: number;
  per_page: number;
  page: number;
}

export interface VacancyDetail extends VacancyItem {
  description: string;
  experience: { id: string; name: string };
  employment: { id: string; name: string };
  key_skills: { name: string }[];
}

export interface DictionaryItem {
  id: string;
  name: string;
}

export interface Dictionaries {
  experience: DictionaryItem[];
  employment: DictionaryItem[];
  schedule: DictionaryItem[];
  vacancy_type: DictionaryItem[];
}

export class HHApiClient {
  private readonly baseUrl = "https://api.hh.ru";

  constructor(private request: APIRequestContext) {}

  async getVacancies(params: Record<string, string | number>): Promise<VacancyList> {
    const response = await this.request.get(`${this.baseUrl}/vacancies`, { params });
    return response.json();
  }

  async getVacancy(id: string): Promise<VacancyDetail> {
    const response = await this.request.get(`${this.baseUrl}/vacancies/${id}`);
    return response.json();
  }

  async getDictionaries(): Promise<Dictionaries> {
    const response = await this.request.get(`${this.baseUrl}/dictionaries`);
    return response.json();
  }

  async getAreas(): Promise<{ id: string; name: string; areas: { id: string; name: string }[] }[]> {
    const response = await this.request.get(`${this.baseUrl}/areas`);
    return response.json();
  }

  async getVacanciesRaw(params: Record<string, string | number>) {
    return this.request.get(`${this.baseUrl}/vacancies`, { params });
  }

  async getVacancyRaw(id: string) {
    return this.request.get(`${this.baseUrl}/vacancies/${id}`);
  }
}
