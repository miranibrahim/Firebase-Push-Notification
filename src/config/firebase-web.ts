export interface FirebaseWebConfig {
  apiKey: string;
  projectId: string;
  messagingSenderId: string;
  appId: string;
  vapidKey: string;
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required Firebase web environment variable: ${name}.`);
  }
  return value;
}

export function getFirebaseWebConfig(): FirebaseWebConfig {
  return {
    apiKey: requiredEnv("FIREBASE_API_KEY"),
    projectId: requiredEnv("FIREBASE_PROJECT_ID"),
    messagingSenderId: requiredEnv("FIREBASE_MESSAGING_SENDER_ID"),
    appId: requiredEnv("FIREBASE_APP_ID"),
    vapidKey: requiredEnv("FIREBASE_VAPID_KEY"),
  };
}
