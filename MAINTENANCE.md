# Maintenance Guide

## Setup & Initialization

To initialize the project from a fresh clone:

```bash
cd laravel
composer setup
```
This script handles dependency installation, `.env` creation, key generation, and initial migrations.

## Dependency Management

This project uses a monorepo structure.

### PHP Dependencies
Managed via Composer in the `laravel` directory.
- Update: `composer update`

### Node.js Dependencies
Managed via NPM Workspaces.
- Root: `/package.json`
- Workspaces: `laravel`, `figma/implementation` (@datashare/ui), `types` (@datashare/types).

To install all dependencies:
```bash
npm install
```

## Database Migrations

Database schema changes are managed via Laravel Migrations.

- **Run Migrations:** `php artisan migrate`
- **Rollback:** `php artisan migrate:rollback`
- **Fresh Seed:** `php artisan migrate:fresh --seed` (Destructive! Recreates DB with dummy data).

## Logging

Application logs are stored in `laravel/storage/logs/laravel.log`.
- **Log Level:** Configurable in `.env` (default: `stack`).
- **Rotation:** Daily log rotation is enabled by default.

## Docker Environment

The infrastructure is managed via Docker Compose.
- **Start:** `docker-compose up`
- **Stop:** `docker-compose down`
- **Rebuild:** `docker-compose build` (if `Dockerfile` changes).

## Common Issues

**Permission Issues:**
Ensure the `storage` and `bootstrap/cache` directories are writable by the web server user.
```bash
chmod -R 775 laravel/storage laravel/bootstrap/cache
```
