import express from "express";
import path from "path";
import { getFirebaseWebConfig } from "./config/firebase-web";
import notificationRoutes from "./routes/notification.routes";

const app = express();

app.use(express.json());

app.get("/api/firebase-config", (_req, res) => {
  try {
    const { vapidKey, ...firebaseConfig } = getFirebaseWebConfig();
    res.setHeader("Cache-Control", "no-store");
    res.json({ firebaseConfig, vapidKey });
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Unable to load Firebase web configuration.",
    });
  }
});

app.get("/firebase-messaging-sw.js", (_req, res) => {
  try {
    const { vapidKey: _vapidKey, ...firebaseConfig } = getFirebaseWebConfig();
    res.setHeader("Cache-Control", "no-store");
    res.type("application/javascript").send(`
      importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
      importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");
      firebase.initializeApp(${JSON.stringify(firebaseConfig)});
      firebase.messaging();
    `);
  } catch (error) {
    res.status(500).type("text/plain").send(
      error instanceof Error
        ? error.message
        : "Unable to load Firebase web configuration.",
    );
  }
});

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/notifications", notificationRoutes);

export default app;
