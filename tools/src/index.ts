#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import fontsSetup from "./fonts.js";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Please provide a path to the definitions file.");
  process.exit(1);
}

const filePath = resolve(process.cwd(), args[0]);

try {
  const content = readFileSync(filePath, "utf-8");
  const options = JSON.parse(content);
  const result = fontsSetup(options);
  console.log(result);
} catch (error) {
  console.error("Error processing file:", error);
  process.exit(1);
}
