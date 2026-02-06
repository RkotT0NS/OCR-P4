import type { StorybookConfig } from "@storybook/react-vite";
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
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],

  framework: "@storybook/react-vite",
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
export default config;
