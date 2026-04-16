# Mecenate Feed — React Native Expo

A production-quality Feed screen for the Mecenate app (Patreon/Boosty-style), built with React Native + Expo.

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React Native + Expo SDK 54 |
| Language | TypeScript (strict) |
| HTTP client | axios |
| Server state | @tanstack/react-query (v5) |
| Client state | MobX + mobx-react-lite |
| Images | expo-image |

## Features

- Infinite scroll feed with cursor-based pagination
- Pull-to-refresh
- Paid post overlay (content locked behind subscription)
- Loading / Error / Empty states
- Dark theme with design tokens
- `React.memo` + `keyExtractor` for FlatList performance
- Strict TypeScript throughout

## Setup

### 1. Clone & install

```bash
git clone <repo-url>
cd listTestList
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in the values:

```
EXPO_PUBLIC_API_URL=https://k8s.mectest.ru/test-app
EXPO_PUBLIC_USER_ID=550e8400-e29b-41d4-a716-446655440000
```

> The API uses Bearer UUID authentication. Any valid UUID v4 works as a user identifier.

### 3. Start the app

```bash
npm start          # Expo Go / dev client
npm run android    # Android emulator
npm run ios        # iOS simulator
```

Scan the QR code with **Expo Go** on your device.

## Project Structure

```
src/
├── api/
│   ├── client.ts          # axios instance with auth + error interceptor
│   └── posts.api.ts       # posts endpoint functions
├── store/
│   ├── root.store.ts      # RootStore + StoreContext + useStore hook
│   └── post.store.ts      # MobX store for optimistic like state
├── hooks/
│   ├── usePosts.ts        # useInfiniteQuery for paginated posts feed
│   └── useRefresh.ts      # pull-to-refresh state + handler
├── components/
│   ├── common/
│   │   ├── Loader.tsx
│   │   ├── ErrorState.tsx
│   │   └── EmptyState.tsx
│   └── feed/
│       ├── PostCard/
│       │   ├── PostCard.tsx        # React.memo card component
│       │   ├── PostCard.styles.ts
│       │   └── PostCard.types.ts
│       ├── AuthorInfo.tsx          # Avatar + name + verified badge + date
│       ├── PostStats.tsx           # Likes + comments counts
│       └── PaidPostOverlay.tsx     # Lock overlay for paid posts
├── screens/
│   └── FeedScreen/
│       ├── FeedScreen.tsx
│       └── FeedScreen.styles.ts
├── theme/
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── index.ts
├── types/
│   ├── post.types.ts
│   └── api.types.ts
├── utils/
│   ├── formatCount.ts     # 1200 → "1.2K", 1500000 → "1.5M"
│   └── constants.ts
└── providers/
    └── QueryProvider.tsx  # React Query client + provider
```

## Environment Variables

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_API_URL` | Base URL for the Mecenate API |
| `EXPO_PUBLIC_USER_ID` | UUID used as Bearer token for API auth |

All env vars use the `EXPO_PUBLIC_` prefix so they are bundled by Expo and accessible via `process.env`.
