#!/usr/bin/env bash
CI_TESTING_USAGE() {
cat <<EOD
Pre-requisites:
- bash
- npm
- docker
- nodejs
- lcov
- crudini
- git
- jq
- sed

Commands available :

CI_TESTING_USAGE
    Currently empty, but intended to display help or usage information for the script.

CI_TESTING_RUN
    Orchestrates the entire test suite. It builds the required workspace packages and frontend assets (with sourcemaps), cleans up previous coverage data, resets/seeds the test database, and sequentially runs the backend (PHPUnit), component (Storybook), and End-to-End (E2E) tests.

CI_TESTING_RUN_MERGE_COVERAGE
    Consolidates test coverage reports. It merges PHPUnit coverage and formats the XML paths, then adjusts the file paths for the Storybook and E2E `lcov.info` files to match the monorepo structure before merging them into a single `lcov.info` file.

CI_TESTING_VERSION
    Handles versioning and artifacts. It bumps the project's patch version in `package.json`, updates `sonar-project.properties` with the new version, stages the updated config and coverage artifacts, and creates a new git commit for the version bump.
EOD
}
CI_TESTING_RUN() {
    npm run build \
        -w @datashare/theme \
        -w @datashare/pagination-cache \
        -w @datashare/types \
        -w @datashare/upload
    npm run laravel:build-frontend-sourcemap
    npm run cleanup:phpunit-e2e-coverage
    docker exec laravel_app_test php artisan migrate:fresh --seed
    npm run test:laravel-phpunit
    npm run test:stories
    docker exec laravel_app_test php artisan migrate:fresh --seed
    npm run test:e2e
}

merge_coverage() {
    npm run phpunit:merge-coverage
    sed 's|<file name="/var/www/|<file name="laravel/|g' laravel/unified-clover.xml > unified-clover.xml

    sed 's|^SF:|SF:figma/implementation/|g' figma/implementation/stories-coverage/lcov.info > stories-lcov.info
    sed 's|^SF:resources/js/|SF:laravel/resources/js/|g' e2e/coverage/lcov.info > e2e-lcov.info
    lcov -a stories-lcov.info -a e2e-lcov.info -o lcov.info
}

version() {
    npm version patch --allow-same-version --no-git-tag
    crudini --set sonar-project.properties "" "sonar.projectVersion" "$(jq -r .version < package.json)"
    git add lcov.info unified-clover.xml package{,-lock}.json sonar-project.properties
    git commit -m "chore(versioning): Update coverage artifact for version $(jq -r .version < package.json)"
}

CI_TESTING_USAGE
