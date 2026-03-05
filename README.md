# DataShare WebApp

DataShare WebApp is a robust, full-stack file-sharing application built with **Laravel 12** and **React 19**. It features a modern architecture utilizing **Inertia.js** for a seamless SPA experience, **Tus-PHP** for resumable uploads, and a standalone design system.

## 📚 Documentation

Detailed documentation is available in the following files:

- [**Testing Guide**](TESTING.md) - Backend tests, frontend linting, and UI visual regression testing.
- [**Security Policy**](SECURITY.md) - Authentication stack, vulnerability reporting, and best practices.
- [**Performance Guide**](PERF.md) - Architecture, caching strategies (Redis), and optimization techniques.
- [**Maintenance Guide**](MAINTENANCE.md) - Setup instructions, dependency management, and troubleshooting.
- [**Project Context**](GEMINI.md) - AI-generated context and detailed architecture overview.

## 🚀 Quick Start

1. **Start Infrastructure:**
   ```bash
   npm run docker
   ```

2. **Initialize Application:**
   ```bash
   npm run laravel:setup
   ```

## Architecture Overview

- **Backend:** Laravel 12, PostgreSQL, Redis
- **Frontend:** React 19, Inertia.js, Tailwind CSS v4
- **UI Library:** Custom component library in `figma/implementation`
- **Uploads:** Tus-PHP (Resumable)

For a comprehensive synopsis of the project goals, see [synopsis.md](synopsis.md).
