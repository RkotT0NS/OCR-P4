import { test, expect } from "@playwright/test";
import { setupCoverage, tearDownCoverage } from "../coverage";
import * as fs from "fs";
import * as path from "path";

test("Allow drag and drop after login", async ({ page }) => {
  // Start login duplication
  await setupCoverage(page);

  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  await page.getByLabel("Email").fill("someone@somewhere.net");
  await page.getByLabel("Mot de passe").fill("Abcdefgh,123");

  await page.getByRole("button", { name: "Connexion" }).click();

  await expect(page.getByRole("button", { name: "Mon espace" })).toBeVisible();
  // End login duplication

  const filePath = path.resolve(
    __dirname,
    "../samples/stately-ai-raisedmo.png",
  );
  const fileBuffer = fs.readFileSync(filePath);

  const dataTransfer = await page.evaluateHandle(
    (data) => {
      const dt = new DataTransfer();

      const byteArray = Uint8Array.from(atob(data.buffer), (char) =>
        char.charCodeAt(0),
      );

      const file = new File([byteArray], data.name, { type: data.mimeType });
      dt.items.add(file);

      return dt;
    },
    {
      buffer: fileBuffer.toString("base64"),
      name: "stately-ai-raisedmo.png",
      mimeType: "application/pdf",
    },
  );

  const dropZoneSelector = "body";

  await page.dispatchEvent(dropZoneSelector, "dragenter", { dataTransfer });
  await page.dispatchEvent(dropZoneSelector, "dragover", { dataTransfer });

  await page.dispatchEvent(dropZoneSelector, "drop", { dataTransfer });

  await expect(page.getByText("stately-ai-raisedmo.png")).toBeVisible();
  await tearDownCoverage(page, test);
});
