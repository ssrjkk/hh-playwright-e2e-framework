# HH.ru Test Framework - Playwright + TypeScript

> QA Automation Engineer - Playwright - TypeScript - API & UI Testing
> Saint Petersburg

## Stack

- Playwright 1.43
- TypeScript 5.4
- Node.js 20

## Structure

| Path | Description |
|------|-------------|
| `helpers/api-client.ts` | Typed API client with interfaces |
| `pages/` | Page Object Model for UI tests |
| `fixtures/` | Custom Playwright fixtures |
| `tests/api/` | API tests: vacancies, areas, dictionaries |
| `tests/ui/` | UI tests via browser |
| `tests/integration/` | End-to-end flow tests |
| `test-data/` | Search queries, area IDs, constants |

## Run

```bash
npm install
npx playwright install chrome

npm test
npm run test:api
npm run test:ui
npm run test:smoke
npm run report
```

## What is tested

**API**
- Vacancies search with filters: area, experience, per_page
- Vacancy detail returns all required fields
- Non-existent vacancy returns 404
- Response time under 3000ms
- Dictionaries: experience, employment structure
- Areas: Russia and Saint Petersburg exist

**UI**
- Search page loads correctly
- Search returns vacancy cards
- Vacancy titles are visible

**Integration**
- Search then get vacancy detail - data is consistent
- Area ID from /areas works in /vacancies filter
- Experience from /dictionaries works as search filter

## Contacts

- Telegram: @ssrjkk
- Email: ray013lefe@gmail.com
- GitHub: https://github.com/ssrjkk
