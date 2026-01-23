import type { StorybookConfig } from '@storybook/react-vite';

function generateFontUrl(name: string, size: number[]): string {
    // return `family=${name}:wght@0,100;0,300;0,700;0,900`; //&amp;family=Inter:wght@0,100..900;1,100..900`; //${size.join(';')}`;
    return `family=${name}:ital,wght@0,100..900;1,100..900&subset=latin`;
    //&amp;family=Inter:wght@0,100..900;1,100..900`; //${size.join(';')}`;
    // return `family=${name}:wght@1,100..900`; //${size.join(';')}`;
}
const config: StorybookConfig = {
  previewBody: (body) => `
    ${body}
    <link
        href="https://fonts.googleapis.com/css?${generateFontUrl('DM Sans', [100, 300, 700])}"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/css?${generateFontUrl('Inter', [100, 300, 700])}"
        rel="stylesheet"
    />
  `,
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],

  "framework": "@storybook/react-vite"
};
export default config;
