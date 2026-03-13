# @datashare/upload

A ready-to-use Uppy-based context designed for React applications. This package provides a robust and seamless file uploading experience, leveraging the power of Uppy and the Tus resumable upload protocol.

## Features

- **React Integration**: Built to work natively with React 19.
- **Resumable Uploads**: Uses `@uppy/tus` to support resumable uploads, ensuring large files are handled reliably even over unstable network connections.
- **Uppy Core Engine**: Powered by `@uppy/core` for a highly customizable and extensible uploading architecture.
- **TypeScript Support**: Written in TypeScript and ships with type definitions for a type-safe development experience.
- **ES Modules**: Distributed as an ESM package for modern bundlers and build tools.

## Installation

Since this package is part of the workspace, you can use it in other packages/apps within the monorepo by adding it to your dependencies.

```bash
npm install @datashare/upload
```

## Available Scripts

- `npm run build`: Compiles the TypeScript source code to JavaScript inside the `dist` folder.
- `npm run watch`: Runs the TypeScript compiler in watch mode, automatically recompiling when changes are detected.
