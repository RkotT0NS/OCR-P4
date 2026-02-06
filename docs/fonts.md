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
