# Firebase Push Notifications

## Setup

Requires Node.js and a Firebase project with Cloud Messaging enabled.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate a service account key (Project Settings > Service Accounts > Generate new private key). Save it as serviceAccountKey.json:

  ```bash
  {
    "type": "service_account",
    "project_id": "your_project_id",
    "private_key_id": "your_private_key_id",
    "private_key": "your_private_key",
    "client_email": "your_client_email",
    "client_id": "your_client_id",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "service_account_url",
    "universe_domain": "googleapis.com"
  }
  ```

3. Copy `.env.example` to `.env` and fill in the Firebase web config and VAPID key from Firebase Console. Set `SERVICE_ACCOUNT_PATH` to your Firebase Admin service-account JSON file; keep that file private.
4. Grant the service account the **Firebase Cloud Messaging Service Editor** role (`roles/cloudmessaging.editor`) in Google Cloud IAM to manage topics and send messages.

## Run

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to generate an FCM device token. For production, build and run with `npm run build` and `npm start`.

## API examples

Replace `YOUR_FCM_DEVICE_TOKEN` with a token from the page. The cookie header is optional.

Send a notification to one device:

```bash
curl --location 'http://localhost:3000/api/notifications/send' \
  --header 'Content-Type: application/json' \
  --data '{
    "token": "YOUR_FCM_DEVICE_TOKEN",
    "title": "Hello!!",
    "body": "This is a single push notification for a specific device"
  }'
```

Send a notification to a topic (devices must first be subscribed to that topic):

```bash
curl --location 'http://localhost:3000/api/notifications/send-topic' \
  --header 'Content-Type: application/json' \
  --data '{
    "topic": "a",
    "title": "Congratulations!!!",
    "body": "You have won a prize!!!"
  }'
```
