export const PAGE_SIZE = 10;
export const COMMENT_PAGE_SIZE = 15;
export const ON_END_REACHED_THRESHOLD = 0.5;
export const COVER_IMAGE_HEIGHT = 320;
export const FEED_COVER_HEIGHT = 400;
export const AVATAR_SIZE = 36;
export const COMMENT_AVATAR_SIZE = 28;

const rawApiUrl = process.env.EXPO_PUBLIC_API_URL ?? '';
export const WS_URL = rawApiUrl.replace(/^https/, 'wss').replace(/^http/, 'ws') + '/ws';
export const WS_TOKEN = process.env.EXPO_PUBLIC_USER_ID ?? '';
export const WS_PING_INTERVAL_MS = 30_000;
export const WS_INITIAL_BACKOFF_MS = 1_000;
export const WS_MAX_BACKOFF_MS = 30_000;
