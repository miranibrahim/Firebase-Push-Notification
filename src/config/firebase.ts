import "dotenv/config";
import { readFileSync } from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";

const serviceAccountPath = process.env["SERVICE_ACCOUNT_PATH"];

if (!serviceAccountPath) {
  throw new Error(
    "SERVICE_ACCOUNT_PATH must point to a Firebase service account JSON file.",
  );
}

initializeApp({
  credential: cert(JSON.parse(readFileSync(serviceAccountPath, "utf8"))),
});