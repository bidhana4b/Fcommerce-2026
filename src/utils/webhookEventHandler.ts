/**
 * Example webhook handler for Facebook and Instagram webhooks
 * 
 * NOTE: This is a client-side example for demonstration purposes.
 * In a real application, this would be implemented on the server side.
 */

import { 
  verifyWebhookSignature, 
  processFacebookMessage, 
  processInstagramComment,
  processWebhookVerification,
  storeWebhookEvent
} from './webhookHandler';

/**
 * Handle Facebook/Instagram webhook verification request
 * This is called when Facebook/Instagram is verifying your webhook endpoint
 */
export const handleWebhookVerification = (
  req: {
    query: {
      'hub.mode'?: string;
      'hub.verify_token'?: string;
      'hub.challenge'?: string;
    }
  },
  res: {
    status: (code: number) => { send: (data: any) => void };
  },
  verifyToken: string
) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const challengeResponse = processWebhookVerification(
    mode || null,
    token || null,
    challenge || null,
    verifyToken
  );

  if (challengeResponse) {
    // Return the challenge to confirm the webhook
    return res.status(200).send(challengeResponse);
  }

  // Not a valid verification request
  return res.status(403).send('Verification failed');
};

/**
 * Handle Facebook/Instagram webhook events
 * This is called when Facebook/Instagram sends events to your webhook
 */
export const handleWebhookEvent = async (
  req: {
    headers: { [key: string]: string };
    body: any;
    rawBody?: string;
  },
  res: {
    status: (code: number) => { send: (data: any) => void };
  },
  webhookSecret: string
) => {
  // Get the signature from headers
  const signature = req.headers['x-hub-signature-256'] || null;
  
  // Verify the signature
  const isValid = await verifyWebhookSignature(
    signature,
    req.rawBody || JSON.stringify(req.body),
    webhookSecret
  );

  if (!isValid) {
    console.error('Invalid webhook signature');
    return res.status(403).send('Invalid signature');
  }

  // Process the webhook event based on the type
  try {
    const body = req.body;
    
    // Acknowledge receipt of the event
    res.status(200).send('EVENT_RECEIVED');

    // Handle different webhook event types
    if (body.object === 'page') {
      // Facebook page webhook
      body.entry.forEach((entry: any) => {
        // Handle messaging events (Messenger)
        if (entry.messaging) {
          entry.messaging.forEach((messagingEvent: any) => {
            if (messagingEvent.message) {
              const processedEvent = processFacebookMessage(messagingEvent);
              storeWebhookEvent(processedEvent);
              console.log('Processed Facebook message:', processedEvent);
            }
          });
        }
        
        // Handle feed events (posts, comments, etc.)
        if (entry.changes) {
          entry.changes.forEach((change: any) => {
            console.log('Facebook feed change:', change);
            // Process different types of feed changes
            // Implementation would depend on the specific event types
          });
        }
      });
    } 
    else if (body.object === 'instagram') {
      // Instagram webhook
      body.entry.forEach((entry: any) => {
        entry.changes.forEach((change: any) => {
          if (change.field === 'comments') {
            // Handle Instagram comments
            const processedEvent = processInstagramComment(change.value);
            storeWebhookEvent(processedEvent);
            console.log('Processed Instagram comment:', processedEvent);
          } else {
            // Handle other Instagram event types
            console.log('Instagram change:', change);
          }
        });
      });
    } 
    else {
      // Unknown webhook object type
      console.log('Unknown webhook object:', body.object);
      return res.status(400).send('Unrecognized webhook object');
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    // We've already sent a 200 response, so just log the error
  }
};

/**
 * Example usage in an Express server:
 * 
 * ```
 * import express from 'express';
 * import { handleWebhookVerification, handleWebhookEvent } from './webhookEventHandler';
 * 
 * const app = express();
 * const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
 * const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
 * 
 * // Parse raw body for signature verification
 * app.use('/webhook', express.json({
 *   verify: (req, res, buf) => {
 *     req.rawBody = buf.toString();
 *   }
 * }));
 * 
 * // Webhook verification endpoint
 * app.get('/webhook', (req, res) => {
 *   handleWebhookVerification(req, res, VERIFY_TOKEN);
 * });
 * 
 * // Webhook event endpoint
 * app.post('/webhook', (req, res) => {
 *   handleWebhookEvent(req, res, WEBHOOK_SECRET);
 * });
 * 
 * app.listen(3000, () => {
 *   console.log('Server is running on port 3000');
 * });
 * ```
 */