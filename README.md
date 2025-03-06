# Playwright API Testing Project

This project is built for automated testing of book management API website using Playwright.

## Prerequisites

- Node.js version 18 or higher is needed to run the latest version of Playwright.

## Getting Started

1. ### Clone the repository
   You need to create folder on your computer where will be local version of the project:

- Create empty folder on your PC
  Open terminal and position to the created folder:
- Open terminal and position inside the created folder
  **_example_**:

```
cd home/Desktop/playwright_project
```

### Type following command for cloning project locally

- Type following :

```
git clone https://github.com/Aviv-public/aviv-qa-api-technical-test.git
```

2. ### Install dependencies

- Type following :

```
npm install
```

3. ### Run server

- Type following

```
npm run start
```

4. ### Commands to run the tests

- Run all tests in headless mode:

```
npx playwright test
```

- Run a specific spec file:

```
npx playwright test tests/test-cases/your-test-file.spec.js
```

- Run a specific test:

```
npx playwright test tests/test-cases/your-test-file.spec.js:line-number
```

5. ### To open last HTML test report run

- Type following :

```
npx playwright show-report
```

## For more detailed information, refer to the [Playwright documentation](https://playwright.dev/docs/intro).
