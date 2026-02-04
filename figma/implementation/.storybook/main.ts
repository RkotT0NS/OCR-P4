import type { StorybookConfig } from "@storybook/react-vite";
import fontsSetup from "@datashare/tools";
import fontsDefinition from "../fontsDefinition.json" with { type: "json" };

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
};
export default config;
