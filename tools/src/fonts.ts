import { z } from "zod";

const FontFeaturesSchema = z
  .object({
    namedFeatures: z.array(z.string()),
    variants: z.array(z.array(z.string())),
    display: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    data.variants.forEach((variant, index) => {
      if (variant.length !== data.namedFeatures.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Variant at index ${index} must have ${data.namedFeatures.length} items to match namedFeatures.`,
          path: ["variants", index],
        });
      }
    });
  });

const FontDefinitionSchema = z.object({
  name: z.string(),
  features: FontFeaturesSchema.optional(),
});

const FontsSetupSchema = z.object({
  definitions: z.array(FontDefinitionSchema),
  definitionDomain: z.string(),
  sourceDomain: z.string(),
  apiPath: z.string(),
});

export { FontsSetupSchema };

export type FontSetupOptions = z.infer<typeof FontsSetupSchema>;
type FontFeaturesVariants = z.infer<typeof FontFeaturesSchema>;

/**
 *
 * @param {string} name
 * @param {FontFeaturesVariants} features
 * @returns
 */
export function generateFontUrl(
  name: string,
  features?: FontFeaturesVariants,
): string {
  const display = features?.display ?? "swap";

  if (typeof features === "undefined")
    return `family=${name}&display=${display}`;

  const fontFamilyVariants = `${name}:${features.namedFeatures.join(",")}@${features.variants
    .map((variant) => variant.join(","))
    .join(";")}`;

  return `family=${fontFamilyVariants}&display=${display}`;
}

export default function fontsSetup(options: unknown) {
  // Validate input at runtime
  const result = FontsSetupSchema.safeParse(options);

  if (!result.success) {
    const errorMessage = result.error.issues.map((e) => e.message).join("\\n");
    console.error("Font Setup Validation Error:", result.error.format());

    // Return a safe string that won't break the HTML but logs the error in the browser
    return `<script>console.error("Font Setup Error: ${errorMessage}");</script><!-- Font Setup Error: ${errorMessage} -->`;
  }

  const validatedOptions = result.data;

  return `<link rel="preconnect" href="${validatedOptions.definitionDomain}" />
<link rel="preconnect" href="${validatedOptions.sourceDomain}" />
${validatedOptions.definitions
  .map(({ name, features }) => {
    return `<link href="${validatedOptions.definitionDomain}/${validatedOptions.apiPath}?${generateFontUrl(name, features)}" rel="stylesheet" />`;
  })
  .join("\n")}\n`;
}
