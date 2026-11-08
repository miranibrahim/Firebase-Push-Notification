import "dotenv/config";
import { cert, initializeApp } from "firebase-admin/app";

const serviceAccountPath = process.env["SERVICE_ACCOUNT_PATH"];

if (!serviceAccountPath) {
  throw new Error(
    "SERVICE_ACCOUNT_PATH must point to a Firebase service account JSON file.",
  );
}

initializeApp({
  credential: cert(serviceAccountPath),
});