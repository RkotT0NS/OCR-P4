# Testing Guide

This project maintains high code and behavior quality through a combination of backend tests, frontend linting, e2e test, storybook vitest and visual regression testing for UI components.

Test needs to be run against a fresh laravel testing environment.
To get it up and running, run:
```bash
npm run docker:testing
docker exec laravel_app_test composer setup:testing
```

Before running tests, make sure the testing environment is up and running. Then, refresh the setup, run:
```bash
docker exec laravel_app_test composer reset:testing
```

## Backend Testing (Laravel)

We use **PHPUnit** for backend feature and unit tests.

### Running Tests
To run the full backend test suite:
```bash
npm run test:laravel-phpunit
```
Those test will generate php coverage in `./laravel/storage/coverage-e2e/phpunit-base.cov`

### Static Analysis & Linting
We use **Laravel Pint** to ensure PHP code style consistency.
```bash
npm run laravel:lint
```

## Frontend Testing


### Linting
We use **ESLint** to maintain JavaScript/TypeScript code quality.
The root package lint command execute the lint check in both `@datashare/ui` and `@datashare/webapp`
```bash
npm run lint
```

## UI Component Library Testing

The UI component library is located in `./figma/implementation`. It uses **Storybook** for component development and **Chromatic** for visual regression testing.

### Vitest 

A [vitest test suite is derived, as described in the storybook documentation](https://storybook.js.org/docs/writing-tests/test-coverage), from existing stories in @datashar/ui:
```bash
npm run test:stories
```
Those tests will generate coverage in `./figma/implementation/stories-coverage/lcov.info`.

### Storybook
To start the Storybook server and view components in isolation:
```bash
npm run storybook
```

### Visual Regression (Chromatic)
To run visual regression tests (requires Chromatic API key configured):
```bash
cd figma/implementation
npm run chromatic
```

## e2e

Those tests are used to complete both Backend and Frontend testing.

Before running those test a source mapped of the javascript assets must be produced using `npm run laravel:build-frontend-sourcemap`. 
Then, we use **playwright** to test the behavior of the application according to the test suite defined in `e2e/tests`  
```bash
npm run test:e2e
```

Those test will capture `@datashare/webapp` and `@datashare/ui` frontend coverage in `e2e/coverage/lcov.info`. 

More over each request done against the laravel application will generate additional coverage for the laravel application inside './laravel/storage/coverage-e2e/' with `req_[a-f0-9]+.\d+.cov` pattern.

We need to ensure [best practice, as described in the playwright documentation](https://playwright.dev/docs/next/best-practices), are followed when writing tests to avoid issues in the testing process.(https://playwright.dev/docs/next/best-practices)

## Test aggregation

Before pushing to the remote, the test result coverage needs to be updated to allow sonarcloud inspection triggered by the [github build workflow](./.github/workflows/build.yml). More details on how to configure sonarcloud can be found in the [Analyzing source code > Test coverage > PHP test coverage](https://docs.sonarsource.com/sonarqube-server/2025.1/analyzing-source-code/test-coverage/php-test-coverage) documentation section.

For the backend part of the application, sonarcloud natively understand the clover xml format. 
To aggregate and normalize coverage from Backend unit test and e2e tests, we are using phpcov to merge php coverage into clover xml format and the `sed` command to normalize path

```bash
npm run phpunit:merge-coverage
sed 's|<file name="/var/www/|<file name="laravel/|g' laravel/unified-clover.xml > unified-clover.xml
```

For frontend part of the application, we to first normalized reported path using the `sed` command

```bash
sed 's|^SF:|SF:figma/implementation/|g' figma/implementation/stories-coverage/lcov.info > stories-lcov.info
sed 's|^SF:resources/js/|SF:laravel/resources/js/|g' e2e/coverage/lcov.info > e2e-lcov.info
```

Then, using the `lcov` command comming from [`linux-test-project`](https://github.com/linux-test-project/lcov), we merge those coverage into a unique coverage source to speed up the final sonarcloud inspection.

```bash
lcov -a stories-lcov.info -a e2e-lcov.info -o lcov.info
```

Finally we need to update the repositories versionning with those new coverage metrics using 

```bash
npm version patch --allow-same-version --no-git-tag
crudini --set sonar-project.properties "" "sonar.projectVersion" "$(jq -r .version < package.json)"
git add lcov.info unified-clover.xml package{,-lock}.json sonar-project.properties
git commit -m "chore(versioning): Update coverage artifact for version $(jq -r .version < package.json)"
```
