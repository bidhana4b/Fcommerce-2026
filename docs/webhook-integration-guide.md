# Facebook & Instagram Webhook Integration Guide

This guide explains how to set up webhooks for Facebook and Instagram to receive real-time updates in your application.

## Overview

Webhooks allow your application to receive real-time updates from Facebook and Instagram when certain events occur, such as:

- New messages in Facebook Messenger
- New comments on Facebook posts
- New comments on Instagram posts
- Direct messages on Instagram
- Mentions in Instagram posts or stories

## Setup Instructions

### 1. Facebook Developer Account Setup

1. Go to [Facebook for Developers](https://developers.facebook.com/) and create a developer account
2. Create a new app (Business type)
3. Add the "Messenger" and "Instagram Graph API" products to your app

### 2. Configure Webhook URL

In your Facebook Developer Dashboard:

1. Navigate to your app > Webhooks > Setup Webhooks
2. Enter your webhook URL (e.g., `https://your-domain.com/api/webhooks/facebook`)
3. Enter your webhook verification token (this should match the token in your app)
4. Select the subscription fields you want to receive:
   - `messages` for Messenger messages
   - `feed` for post updates
   - `comments` for comments on posts
   - For Instagram: `comments`, `mentions`, etc.

### 3. Configure Your Application

In the Social Integration settings of your application:

1. Enter your webhook URL
2. Generate and enter a secure webhook secret
3. Enable the events you want to receive
4. Click "Facebook Webhook Setup" or "Instagram Webhook Setup"

### 4. Verify Webhook

1. Click "Test Webhook" to verify your endpoint is correctly configured
2. Facebook will send a verification request to your webhook URL
3. Your application should respond with the challenge code

## Webhook Verification

When Facebook/Instagram sends a verification request, it will include:

- `hub.mode`: Will be "subscribe"
- `hub.verify_token`: Your verification token
- `hub.challenge`: A challenge string

Your webhook endpoint should verify the token and return the challenge string.

## Webhook Signature Verification

Each webhook request from Facebook includes a signature in the `X-Hub-Signature-256` header. Your application should verify this signature to ensure the request is authentic.

```javascript
// Example signature verification
const crypto = require('crypto');

function verifySignature(req, secret) {
  const signature = req.headers['x-hub-signature-256'];
  const hmac = crypto.createHmac('sha256', secret);
  const expectedSignature = 'sha256=' + hmac.update(req.rawBody).digest('hex');
  return signature === expectedSignature;
}
```

## Testing with Generated Data

For development and testing purposes, you can use the "Test Data Generator" in the Social Integration settings:

1. Enable "Testing Mode"
2. Select the type of event you want to generate
3. Click the corresponding button to generate test data
4. View the event in the "Webhook Event Log"

## Webhook Event Types

### Facebook Events

- **Messages**: Received when someone sends a message to your Facebook page
- **Feed Posts**: Received when there's a new post on your page
- **Comments**: Received when someone comments on your page's posts
- **Reactions**: Received when someone reacts to your page's posts

### Instagram Events

- **Comments**: Received when someone comments on your Instagram posts
- **Mentions**: Received when someone mentions your Instagram account
- **Direct Messages**: Received when someone sends you a direct message
- **Story Mentions**: Received when someone mentions you in their story

## Webhook Payload Examples

### Facebook Message

```json
{
  "object": "page",
  "entry": [{
    "id": "PAGE_ID",
    "time": 1457764198246,
    "messaging": [{
      "sender": { "id": "USER_ID" },
      "recipient": { "id": "PAGE_ID" },
      "timestamp": 1457764197627,
      "message": {
        "mid": "mid.1457764197618:41d102a3e1ae206a38",
        "text": "hello, world!",
        "quick_reply": { "payload": "DEVELOPER_DEFINED_PAYLOAD" }
      }
    }]
  }]
}
```

### Instagram Comment

```json
{
  "object": "instagram",
  "entry": [{
    "id": "INSTAGRAM_ID",
    "time": 1457764198246,
    "changes": [{
      "field": "comments",
      "value": {
        "id": "COMMENT_ID",
        "text": "This is a great photo!",
        "from": {
          "id": "USER_ID",
          "username": "username"
        },
        "media": {
          "id": "MEDIA_ID"
        }
      }
    }]
  }]
}
```

## Troubleshooting

If you're having issues with webhooks:

1. Check that your webhook URL is publicly accessible
2. Verify that your webhook secret is correctly configured
3. Check that you've selected the correct subscription fields
4. Look for any errors in your webhook endpoint logs
5. Use the "Test Webhook" feature to verify your endpoint

## Resources

- [Facebook Webhooks Documentation](https://developers.facebook.com/docs/graph-api/webhooks)
- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api)
- [Messenger Platform Webhooks](https://developers.facebook.com/docs/messenger-platform/webhook)