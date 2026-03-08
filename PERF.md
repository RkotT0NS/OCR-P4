# Performance Guide

## Architecture

This application is designed for performance using a modern stack:
- **Web Server:** Nginx (via Docker) serving static assets and proxying PHP requests.
- **Backend:** Laravel 12.
- **Frontend:** React 19 with Inertia.js, utilizing code splitting and prefetching.

## Caching & Queues

### Redis
We use **Redis** for both caching and queue management to ensure high throughput and low latency.
- **Cache Store:** Application data caching.
- **Session Store:** Fast session retrieval.
- **Queue Connection:** Asynchronous job processing (e.g., file processing, emails).

Ensure your Redis instance is configured with appropriate eviction policies (e.g., `allkeys-lru` for cache).

## Frontend Optimization (Vite)

We use **Vite** for extremely fast builds and HMR (Hot Module Replacement).
- **Production Build:** `npm run build` generates minified, tree-shaken assets.
- **Assets:** Static assets are versioned for effective browser caching.

## File Uploads

Large file uploads are handled via **Tus-PHP**, enabling:
- **Resumable Uploads:** Interrupted uploads can resume without restarting.
- **Chunking:** Files are uploaded in small chunks, reducing memory pressure on the server.

## Optimization Commands

For production deployment, ensure to run the following optimization commands in the `laravel_app` container:

```bash
# Cache configuration, events, and routes
docker exec laravel_app php artisan config:cache
docker exec laravel_app php artisan route:cache
docker exec laravel_app php artisan view:cache
```

## Load testing

At first [artillery](https://app.artillery.io/) will be used to benefit from existing playwright infrastructure from `@datashare/e2e` and will target local development instance.

As soon as a staging environment will be in place, a grafana cloud [k6](https://k6.io/) setup will need to be done.
### References
- [Artillery Documentation](https://www.artillery.io/docs)
- [Artillery - Playwright E2E testing](https://www.artillery.io/docs/get-started/playwright-e2e)
- [Artillery - Setup cloud reporting](https://www.artillery.io/docs/get-started/get-artillery#set-up-cloud-reporting)
