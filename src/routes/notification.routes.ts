import { Router } from "express";
import {
  sendNotification,
  sendToTopic,
  subscribe,
  unsubscribe,
} from "../services/notification.service";

const router = Router();
const validTopic = /^[a-zA-Z0-9-_.~%]+$/;

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

router.post("/subscribe", async (req, res) => {
  const { token, topic } = req.body ?? {};

  if (
    typeof token !== "string" ||
    !token.trim() ||
    typeof topic !== "string" ||
    !validTopic.test(topic)
  ) {
    res.status(400).json({ error: "token and a valid topic are required" });
    return;
  }

  try {
    const result = await subscribe([token], topic);
    if (result.failureCount > 0) {
      res.status(500).json({
        success: false,
        error: result.errors.map(({ error }) => error.message).join("; "),
        result,
      });
      return;
    }
    res.json({ success: true, result });
  } catch (error: unknown) {
    console.error("Failed to subscribe to topic:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to subscribe to topic",
    });
  }
});

router.post("/unsubscribe", async (req, res) => {
  const { token, topic } = req.body ?? {};

  if (
    typeof token !== "string" ||
    !token.trim() ||
    typeof topic !== "string" ||
    !validTopic.test(topic)
  ) {
    res.status(400).json({ error: "token and a valid topic are required" });
    return;
  }

  try {
    const result = await unsubscribe([token], topic);
    if (result.failureCount > 0) {
      res.status(500).json({
        success: false,
        error: result.errors.map(({ error }) => error.message).join("; "),
        result,
      });
      return;
    }
    res.json({ success: true, result });
  } catch (error: unknown) {
    console.error("Failed to unsubscribe from topic:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to unsubscribe from topic",
    });
  }
});

router.post("/send-topic", async (req, res) => {
  const { topic, title, body } = req.body ?? {};

  if (
    typeof topic !== "string" ||
    !validTopic.test(topic) ||
    typeof title !== "string" ||
    !title.trim() ||
    typeof body !== "string" ||
    !body.trim()
  ) {
    res.status(400).json({ error: "topic, title and body are required" });
    return;
  }

  try {
    const messageId = await sendToTopic(topic, title, body);
    res.json({ success: true, messageId });
  } catch (error: unknown) {
    console.error("Failed to send topic notification:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to send topic notification",
    });
  }
});

export default router;