#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import fontsSetup, { FontsSetupSchema } from "./fonts.js";
import { localFonts } from "./local-fonts.js";

const program = new Command();

program
  .name("datashare-tools")
  .description("CLI tools for DataShare")
  .version("1.0.0");

program
  .command("fonts")
  .description("Generate fonts HTML fragment from a JSON definition file")
  .argument("<source>", "Path to the fonts definition JSON file")
  .argument("<output>", "Path to save the generated HTML fragment")
  .action((source, output) => {
    try {
      const sourcePath = resolve(process.cwd(), source);
      const outputPath = resolve(process.cwd(), output);

      const content = readFileSync(sourcePath, "utf-8");
      const options = JSON.parse(content);

      // Strict validation
      const result = FontsSetupSchema.safeParse(options);

      if (!result.success) {
        console.error("Validation failed:");
        result.error.issues.forEach((issue) => {
          console.error(`- ${issue.path.join(".")}: ${issue.message}`);
        });
        process.exit(1);
      }

      const htmlFragment = fontsSetup(options);
      writeFileSync(outputPath, htmlFragment);
      console.log(`Successfully generated fonts fragment at ${outputPath}`);
    } catch (error) {
      console.error("Error processing fonts:", error);
      process.exit(1);
    }
  });

program
  .command("local-fonts")
  .description("Download fonts locally and generate CSS")
  .argument("<source>", "Path to the fonts definition JSON file")
  .argument("<outputDir>", "Directory to save downloaded fonts and CSS")
  .action(async (source, outputDir) => {
    try {
      const sourcePath = resolve(process.cwd(), source);
      const outputPath = resolve(process.cwd(), outputDir);

      const content = readFileSync(sourcePath, "utf-8");
      const options = JSON.parse(content);

      // Strict validation
      const result = FontsSetupSchema.safeParse(options);

      if (!result.success) {
        console.error("Validation failed:");
        result.error.issues.forEach((issue) => {
          console.error(`- ${issue.path.join(".")}: ${issue.message}`);
        });
        process.exit(1);
      }

      await localFonts(options, outputPath);
    } catch (error) {
      console.error("Error processing local fonts:", error);
      process.exit(1);
    }
  });

program.parse();