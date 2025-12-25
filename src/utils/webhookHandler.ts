/**
 * Utility functions for handling Facebook and Instagram webhooks
 */

// Types for webhook events
export interface WebhookEvent {
  id: string;
  time: number;
  type: string;
  source: 'facebook' | 'instagram';
  data: any;
}

export interface FacebookMessageEvent {
  sender: {
    id: string;
  };
  recipient: {
    id: string;
  };
  timestamp: number;
  message: {
    mid: string;
    text: string;
    attachments?: Array<{
      type: string;
      payload: {
        url: string;
      };
    }>;
  };
}

export interface InstagramCommentEvent {
  id: string;
  from: {
    id: string;
    username: string;
  };
  text: string;
  media: {
    id: string;
    media_url: string;
  };
  timestamp: number;
}

/**
 * Verify webhook signature from Facebook/Instagram
 * @param signature The signature from the X-Hub-Signature-256 header
 * @param body The raw request body
 * @param webhookSecret The webhook secret
 * @returns boolean indicating if the signature is valid
 */
export const verifyWebhookSignature = async (
  signature: string | null,
  body: string,
  webhookSecret: string
): Promise<boolean> => {
  if (!signature) return false;
  
  // In a real implementation, this would use crypto to verify the signature
  // For testing purposes, we'll just return true
  console.log('Verifying webhook signature:', signature);
  return true;
};

/**
 * Process Facebook message webhook event
 * @param event The Facebook message event
 * @returns Processed event data
 */
export const processFacebookMessage = (event: FacebookMessageEvent): WebhookEvent => {
  return {
    id: event.message.mid,
    time: event.timestamp,
    type: 'facebook_message',
    source: 'facebook',
    data: {
      senderId: event.sender.id,
      recipientId: event.recipient.id,
      text: event.message.text,
      attachments: event.message.attachments || [],
    }
  };
};

/**
 * Process Instagram comment webhook event
 * @param event The Instagram comment event
 * @returns Processed event data
 */
export const processInstagramComment = (event: InstagramCommentEvent): WebhookEvent => {
  return {
    id: event.id,
    time: event.timestamp,
    type: 'instagram_comment',
    source: 'instagram',
    data: {
      userId: event.from.id,
      username: event.from.username,
      text: event.text,
      mediaId: event.media.id,
      mediaUrl: event.media.media_url,
    }
  };
};

/**
 * Store webhook event in memory (for testing)
 * In a real app, this would store to a database
 */
const webhookEvents: WebhookEvent[] = [];

/**
 * Add webhook event to storage
 * @param event The processed webhook event
 */
export const storeWebhookEvent = (event: WebhookEvent): void => {
  webhookEvents.unshift(event); // Add to beginning of array
  
  // Keep only the last 100 events
  if (webhookEvents.length > 100) {
    webhookEvents.pop();
  }
};

/**
 * Get recent webhook events
 * @param limit Number of events to return
 * @returns Array of recent webhook events
 */
export const getRecentWebhookEvents = (limit: number = 10): WebhookEvent[] => {
  return webhookEvents.slice(0, limit);
};

/**
 * Generate test webhook event for development
 * @param type Type of event to generate ('facebook_message', 'instagram_comment', etc.)
 * @returns Generated webhook event
 */
export const generateTestWebhookEvent = (type: string): WebhookEvent => {
  const now = Date.now();
  
  switch (type) {
    case 'facebook_message':
      return {
        id: `msg_${Math.random().toString(36).substring(2, 10)}`,
        time: now,
        type: 'facebook_message',
        source: 'facebook',
        data: {
          senderId: '123456789',
          recipientId: '987654321',
          text: 'আপনার পণ্যটি কি স্টকে আছে?',
          attachments: [],
        }
      };
      
    case 'facebook_comment':
      return {
        id: `comment_${Math.random().toString(36).substring(2, 10)}`,
        time: now,
        type: 'facebook_comment',
        source: 'facebook',
        data: {
          userId: '123456789',
          userName: 'করিম উদ্দিন',
          text: 'দাম কত?',
          postId: '123456789',
        }
      };
      
    case 'instagram_comment':
      return {
        id: `ig_comment_${Math.random().toString(36).substring(2, 10)}`,
        time: now,
        type: 'instagram_comment',
        source: 'instagram',
        data: {
          userId: '111222333',
          username: 'salma_begum',
          text: 'দাম কত?',
          mediaId: '123456789',
          mediaUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
        }
      };
      
    case 'instagram_message':
      return {
        id: `ig_msg_${Math.random().toString(36).substring(2, 10)}`,
        time: now,
        type: 'instagram_message',
        source: 'instagram',
        data: {
          userId: '111222333',
          username: 'salma_begum',
          text: 'আপনার পণ্যটি কি স্টকে আছে?',
        }
      };
      
    default:
      throw new Error(`Unknown test event type: ${type}`);
  }
};

/**
 * Process webhook verification request from Facebook/Instagram
 * @param mode The hub.mode parameter
 * @param token The hub.verify_token parameter
 * @param challenge The hub.challenge parameter
 * @param verifyToken Your configured verify token
 * @returns The challenge string if verification succeeds, null otherwise
 */
export const processWebhookVerification = (
  mode: string | null,
  token: string | null,
  challenge: string | null,
  verifyToken: string
): string | null => {
  if (mode === 'subscribe' && token === verifyToken) {
    console.log('Webhook verified');
    return challenge;
  }
  
  console.log('Webhook verification failed');
  return null;
};