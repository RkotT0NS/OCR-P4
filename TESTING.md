# Testing Guide

This project maintains high code quality through a combination of backend tests, frontend linting, and visual regression testing for UI components.

## Backend Testing (Laravel)

We use **PHPUnit** for backend feature and unit tests.

### Running Tests
To run the full backend test suite:
```bash
cd laravel
php artisan test
```

### Static Analysis & Linting
We use **Laravel Pint** to ensure PHP code style consistency.
```bash
cd laravel
composer run lint
```

## Frontend Testing

### Linting
We use **ESLint** to maintain JavaScript/TypeScript code quality.
```bash
cd laravel
npm run lint
```

## UI Component Library Testing

The UI component library is located in `figma/implementation`. It uses **Storybook** for component development and **Chromatic** for visual regression testing.

### Storybook
To start the Storybook server and view components in isolation:
```bash
cd figma/implementation
npm run storybook
```

### Visual Regression (Chromatic)
To run visual regression tests (requires Chromatic API key configured):
```bash
cd figma/implementation
npm run chromatic
```
