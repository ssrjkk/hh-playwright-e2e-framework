# E2E Test Framework - Playwright + TypeScript

Mock application for E2E testing with API layer, Page Objects, and CI/CD.

## Stack

- Playwright 1.42
- TypeScript 5.3
- Node.js 20

## Structure

```
src/
├── api/              # API layer
│   ├── base.api.ts   # Base class with request wrapper
│   ├── auth.api.ts  # Auth endpoints
│   ├── users.api.ts # Users endpoints
│   ├── todos.api.ts # Todos endpoints
│   └── api.factory.ts
├── pages/            # Page Objects
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── register.page.ts
│   └── todos.page.ts
├── fixtures/         # Playwright fixtures
├── helpers/          # Logger, validators
├── data/             # DataFactory for test data
├── types/            # TypeScript interfaces
└── tests/
    ├── api/          # API tests
    └── ui/           # UI tests
```

## Run

```bash
npm install
npx playwright install chromium

# Start mock server
node mock-server.js

# Run tests
npm test
npm run test:smoke
npm run test:regression
npm run test:report
```

## Test Tags

- `@smoke` - Critical smoke tests
- `@regression` - Full regression suite
- `@api` - API tests
- `@e2e` - UI tests
- `@critical` - Must pass in CI

## CI/CD

GitHub Actions workflow runs on every push to main/develop.

## Docker

```bash
npm run docker:compose
```
Contacts
Telegram: @ssrjkk
Email: ray013lefe@gmail.com
GitHub: https://github.com/ssrjkk
