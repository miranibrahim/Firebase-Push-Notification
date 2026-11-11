import "../config/firebase";
import { getMessaging } from "firebase-admin/messaging";

export const sendNotification = (token: string, title: string, body: string) =>
  getMessaging().send({
    token,
    notification: { title, body },
  });

export const subscribe = (tokens: string[], topic: string) =>
  getMessaging().subscribeToTopic(tokens, topic);

export const unsubscribe = (tokens: string[], topic: string) =>
  getMessaging().unsubscribeFromTopic(tokens, topic);

export const sendToTopic = (topic: string, title: string, body: string) =>
  getMessaging().send({
    topic,
    notification: { title, body },
  });
