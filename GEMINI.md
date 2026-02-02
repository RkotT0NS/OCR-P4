# DataShare WebApp

## Project Overview

DataShare WebApp is a robust file-sharing application built with a modern full-stack architecture. It leverages **Laravel 12** for the backend and **React 19** with **Inertia.js** for a seamless single-page application (SPA) experience. A key feature is resumable file uploads powered by **Tus-PHP**.

The project is structured as a monorepo (via NPM workspaces) separating the main application, a UI component library, and shared types.

## Architecture

### Backend
*   **Framework:** Laravel 12
*   **Database:** PostgreSQL 15
*   **Cache/Queue:** Redis
*   **Authentication:** Laravel Fortify & Sanctum
*   **File Uploads:** Tus-PHP (Resumable uploads)
*   **Web Server:** Nginx (via Docker)

### Frontend
*   **Framework:** React 19
*   **Routing/Glue:** Inertia.js
*   **Styling:** Tailwind CSS v4
*   **Build Tool:** Vite
*   **State Management:** React Hooks / Context

### Workspaces (Packages)
The project uses NPM workspaces to manage dependencies and shared code:
*   **`laravel`**: The main application code (Backend + Inertia Frontend).
*   **`@datashare/ui`** (`figma/implementation`): A standalone UI component library developed with **Storybook** and **Chromatic**.
*   **`@datashare/types`** (`types`): Shared TypeScript definitions.

## Prerequisites

*   **Docker** & **Docker Compose**
*   **PHP 8.2+**
*   **Composer**
*   **Node.js** (Latest LTS recommended)

## Setup & Development

### 1. Infrastructure (Docker)
Start the database, redis, and web server services:
```bash
# Please do not use `docker-compose up -d`, this eat the available memory for no reason and no advantage 
docker-compose up
```

### 2. Application Setup
The `laravel` directory contains a convenient setup script that handles:
*   Dependency installation (PHP)
*   Environment file creation (`.env`)
*   Key generation
*   Database migrations
*   Initial build

```bash
cd laravel
composer setup
```

### 3. Running the Application
To start the development environment (Server, Queue, and Logs):

```bash
cd laravel
composer run dev
```
The application will typically be accessible at `http://localhost:8000` (or the port configured in your environment).

Since the vite application is splitted into two parts, the frontend and the backend, you need to start them separately. To start the frontend, navigate to the `frontend` directory and run:

```bash
npm run dev -w laravel
```

### 4. UI Library Development
To work on the design system components in isolation:

```bash
npm install # if not already installed
npm run storybook -w figma/implementation
```

## Key Commands

| Context | Command | Description |
| :--- | :--- | :--- |
| **Laravel** | `cd laravel && composer run dev` | Start full dev environment (Laravel + Vite + Queue) |
| **Laravel** | `cd laravel && composer setup` | Initialize the project from scratch |
| **Laravel** | `npm run lint -w` | Lint frontend code (ESLint) |
| **Laravel** | `cd laravel && composer run lint` | Lint backend code (Pint) |
| **Laravel** | `docker exec -it laravel "php artisan test"` | Run backend tests (PHPUnit) |
| **UI Lib** | `npm run storybook -w figma/implementation` | Start Storybook server |
| **UI Lib** | `npm run chromatic -w figma/implementation` | Run visual regression tests |
| **Shared types** | `npm run build:watch -w types` | Build shared types in watch mode |

## Directory Structure

*   `docker/` - Docker configuration (Nginx, etc.).
*   `laravel/` - Main application root.
    *   `app/` - Laravel backend logic.
    *   `resources/js/` - Main React application (Inertia pages, layouts).
    *   `routes/` - API and Web routes.
*   `figma/implementation/` - `@datashare/ui` package source (Components, Stories).
*   `types/` - Shared TypeScript types.
*   `uploads/` - Local storage for file uploads (mapped into Docker).

## Development Conventions

*   **Styling:** Utility-first CSS using Tailwind CSS.
*   **Components:** Developed in isolation within `@datashare/ui` where possible, then consumed by the main app.
*   **Formatting:** Prettier for JS/TS/CSS, Pint for PHP.
*   **Type Safety:** TypeScript is used for all frontend code. Shared types should be defined in `@datashare/types`.
