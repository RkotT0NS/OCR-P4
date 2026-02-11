import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import css from "css";
import { FontSetupOptions, generateFontUrl } from "./fonts.js";

async function downloadFile(url: string, dest: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  
  const buffer = await res.arrayBuffer();
  writeFileSync(dest, Buffer.from(buffer));
}

export async function localFonts(
  options: FontSetupOptions,
  outputDir: string,
) {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const cssContentCombined: string[] = [];

  for (const def of options.definitions) {
    const fontUrl = `${options.definitionDomain}/${
      options.apiPath
    }?${generateFontUrl(def.name, def.features)}`;

    console.log(`Fetching CSS for ${def.name} from ${fontUrl}`);

    const res = await fetch(fontUrl, {
      headers: {
        // Google Fonts serves different CSS based on User-Agent. 
        // We want WOFF2, so we pretend to be a modern Chrome.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch CSS for ${def.name}`);
      continue;
    }

    const cssText = await res.text();
    const parsedCss = css.parse(cssText);

    if (parsedCss.stylesheet) {
      for (const rule of parsedCss.stylesheet.rules) {
        if (rule.type === "font-face" && rule.declarations) {
          for (const decl of rule.declarations) {
            if (
              decl.type === "declaration" &&
              decl.property === "src" &&
              decl.value
            ) {
              // Extract URL: url(https://...)
              const urlMatch = decl.value.match(/url\(([^)]+)\)/);
              if (urlMatch) {
                const originalUrl = urlMatch[1].replace(/['"]/g, "");
                const filename = basename(originalUrl);
                const localPath = resolve(outputDir, filename);

                console.log(`Downloading font: ${filename}`);
                try {
                    await downloadFile(originalUrl, localPath);
                    // Update CSS to point to local file
                    // Assuming the CSS will be placed in the same dir as fonts or served from /fonts/
                    decl.value = `url('${filename}') format('woff2')`;
                } catch (e) {
                    console.error(`Error downloading ${filename}:`, e);
                }
              }
            }
          }
        }
      }
    }

    const modifiedCss = css.stringify(parsedCss);
    cssContentCombined.push(modifiedCss);
  }

  const finalCssPath = resolve(outputDir, "fonts.css");
  writeFileSync(finalCssPath, cssContentCombined.join("\n"));
  console.log(`Saved combined CSS to ${finalCssPath}`);
}
