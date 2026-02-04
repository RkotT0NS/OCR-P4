type FontFeaturesVariants<L extends string[]> = {
  namedFeatures: [string, ...L];
  variants: [[string, ...L], ...[string, ...L][]];
  display?: string;
};

/**
 *
 * @param {string} name
 * @param {FontFeaturesVariants<string[]>} features
 * @returns
 */
function generateFontUrl(
  name: string,
  features?: FontFeaturesVariants<string[]>,
): string {
  const display = features?.display ?? "swap";

  if (typeof features === "undefined")
    return `family=${name}&display=${display}`;

  const fontFamilyVariants = `${name}:${features.namedFeatures.join(",")}@${features.variants
    .map((variant) => variant.join(","))
    .join(";")}`;

  return `family=${fontFamilyVariants}&display=${display}`;
}

type FontDefinitions = {
  name: string;
  features?: FontFeaturesVariants<string[]>;
}[];

export default function fontsSetup(options: {
  definitions: FontDefinitions;
  domain: string;
  apiPath: string;
}) {
  return `<link rel="preconnect" href="${options.domain}" />
${options.definitions
  .map(({ name, features }) => {
    return `<link href="${options.domain}/${options.apiPath}?${generateFontUrl(name, features)}" rel="stylesheet" />`;
  })
  .join("\n")}\n`;
}
