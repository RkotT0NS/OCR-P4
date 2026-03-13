# @datashare/theme

Base design building blocks for the DataShare WebApp.

## Features

This package provides foundational utilities for managing and composing styles within the application, particularly tailored for Tailwind CSS:

*   **Class Name Composition:** Utilizes `clsx` to conditionally construct `className` strings efficiently.
*   **Tailwind Class Merging:** Leverages `tailwind-merge` to safely merge conflicting Tailwind CSS classes without style cascades breaking, ensuring predictable styling when overriding component defaults.
*   **TypeScript Support:** Fully typed, providing accurate type definitions out of the box (`dist/index.d.ts`).
*   **ES Module:** Exported as an ES module for modern bundler compatibility and optimal tree-shaking.

## Scripts

*   `npm run build`: Compiles the TypeScript source code.
*   `npm run watch`: Compiles the source code and watches for changes.

## Dependencies

*   `clsx`
*   `tailwind-merge`
