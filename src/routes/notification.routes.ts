import { Router } from "express";
import { sendNotification } from "../services/notification.service";

const router = Router();

router.post("/send", async (req, res) => {
  const { token, title, body } = req.body ?? {};

  if (
    typeof token !== "string" ||
    !token.trim() ||
    typeof title !== "string" ||
    !title.trim() ||
    typeof body !== "string" ||
    !body.trim()
  ) {
    res.status(400).json({ error: "token, title and body are required" });
    return;
  }

  try {
    const messageId = await sendNotification(token, title, body);
    res.json({ success: true, messageId });
  } catch (error: unknown) {
    console.error("Failed to send push notification:", error);
    res.status(500).json({ success: false, error: "Failed to send notification" });
  }
});

export default router;