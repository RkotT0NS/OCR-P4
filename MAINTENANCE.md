# Maintenance Guide

## Setup & Initialization

To initialize the project from a fresh clone:

```bash
npm ci
npm run laravel:setup
```
This script handles dependency installation, `.env` creation, key generation, and initial migrations.

## Dependency Management

This project uses a monorepo structure.

### PHP Dependencies
Managed via Composer in the `laravel_app` container.
- Update: `docker exec laravel_app composer update`

### Node.js Dependencies
Managed via NPM Workspaces.
- Root: `/package.json`
- Workspaces: 
  - `laravel`(@datashare/webapp)
  - `figma/implementation` (@datashare/ui)
  - `types` (@datashare/types).
  - `tools` (@datashare/tools)
  - `e2e` (@datashare/end-to-end)
  - `packages/pagination-cache` (@datashare/pagination-cache)

To install all dependencies:
```bash
npm ci
```

To update all dependencies:
```bash
./cleanup-workspace
npm install --force # The force switch is needed until the end of the eslint@10 ecosystem migration
npm audit --json > audit.json
git add package-lock.json audit.json
git commit -m"chore: Update locked dependencies"
```
The versionning of the `npm audit` output allow us to follow and detect security issues as they are reported to the npm registry.

#### Ui components
- [Storybook](https://storybook.js.org/) is used for component development and testing.
Both laravel jsx setup and @datashare/ui and @datashare/webapp make use of shadcn ui components. They have been setup using [the Install and configure shadcn/ui for Vite](https://ui.shadcn.com/docs/installation/vite).


## Database Migrations

Database schema changes are managed via Laravel Migrations inside the `laravel_app` container.

- **Run Migrations:** `npm run laravel:db-migrate`
- **Rollback:** `npm run laravel:db-rollback`
- **Fresh Seed:** `npm run laravel:db-reset` (Destructive! Recreates DB with dummy data).

## Logging

Application logs are stored in `laravel/storage/logs/laravel.log`.
- **Log Level:** Configurable in `.env` (default: `stack`).
- **Rotation:** Daily log rotation is enabled by default.

## Docker Environment

The infrastructure is managed via Docker Compose.
- **Start:** `docker compose up`
- **Stop:** `docker compose down`
- **Rebuild:** `docker compose build` (if `Dockerfile` changes).

## Common Issues

**Permission Issues:**
Ensure the `storage` and `bootstrap/cache` directories are writable by the web server user.
```bash
chmod -R 775 laravel/storage laravel/bootstrap/cache
```
