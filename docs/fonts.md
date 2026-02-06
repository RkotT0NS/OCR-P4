# Font Management

This project uses a centralized approach to manage font definitions, ensuring consistency between the Laravel application and the Storybook UI component library.

Those fonts comes from the [google fonts project](https://developers.google.com/fonts)

## Configuration

The source of truth for font definitions is located at:
`figma/implementation/fontsDefinition.json`

This JSON file defines the font domain (e.g., Google Fonts), the API path, and the specific font families and features/variants to be loaded.

**Example Structure:**
```json
{
  "domain": "https://fonts.googleapis.com",
  "apiPath": "css2",
  "definitions": [
    {
      "name": "DM Sans",
      "features": {
        "namedFeatures": ["ital", "opsz", "wght"],
        "variants": [
          ["0", "9..40", "100..1000"],
          ["1", "9..40", "100..1000"]
        ]
      }
    },
    {
      "name": "Inter"
    }
  ]
}
```

## Usage in Laravel

The Laravel main blade template has been configured so that loaded fonts are defined via a partial view: `laravel/resources/views/partials/fonts-fragment.blade.php`.

This file is **generated** from the JSON configuration using the `@datashare/tools` CLI. This ensures that the production app uses exactly the same fonts as the design system.

### Generation Command

To update the fonts fragment, run the following command from the project root:

```bash
npx datashare-tools fonts figma/implementation/fontsDefinition.json laravel/resources/views/partials/fonts-fragment.blade.php
```

This command parses the JSON definition and writes the corresponding HTML `<link>` tags directly to the specified output file.

## Usage in Storybook

The UI library (`@datashare/ui`) also consumes `fontsDefinition.json` directly to ensure components are rendered with the correct fonts during development and testing.

In `figma/implementation/.storybook/main.ts`, the `fontsSetup` utility from `@datashare/tools` is used to inject the font tags into the Storybook preview head.

Additionally, a custom Vite plugin is configured to watch for changes in `fontsDefinition.json`. When this file is modified, the configuration is reloaded and the Storybook preview triggers a full reload, ensuring that font changes are reflected immediately without restarting the server.

```typescript
// figma/implementation/.storybook/main.ts
import fontsSetup from "@datashare/tools";
import initialFontsDefinition from "../fontsDefinition.json" with { type: "json" };
import { readFileSync } from "fs";

let fontsDefinition = {
  ...initialFontsDefinition,
};
const monitoredFontDefinitionsPath = `${process.cwd()}/fontsDefinition.json`;

const config: StorybookConfig = {
  previewHead: (head) => `
    ${head}
    ${fontsSetup(fontsDefinition)}
  `,
  // ...
  viteFinal: async (config) => {
    config.plugins?.push({
      name: "watch-json-hmr",
      handleHotUpdate({ file, server }) {
        if (file === monitoredFontDefinitionsPath) {
          fontsDefinition = JSON.parse(
            readFileSync(monitoredFontDefinitionsPath).toString(),
          );

          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      },
    });
    return config;
  },
};
```