# Backend & Database Specifications for Paraizo Web3

## Overview
The frontend is currently built with Next.js (App Router) and uses `localStorage` for prototyping. We need to replace this with a real backend and database to persist user profiles and stream settings.

## 1. Database Schema
We need a relational database (PostgreSQL recommended) or NoSQL (MongoDB) to store the following entities.

### Users (Profiles)
Stores public profile information for streamers and users.

| Field | Type | Description |
|-------|------|-------------|
| `wallet_address` | String (PK) | Ethereum address (lowercase). Unique. |
| `username` | String | Unique handle (e.g., "cripto_juan"). Used for `/c/[username]` URL. |
| `display_name` | String | Public display name. |
| `bio` | Text | Channel description/bio. |
| `avatar_url` | String | URL to the user's avatar image. |
| `created_at` | Timestamp | |
| `updated_at` | Timestamp | |

### StreamSettings
Stores the metadata for the user's stream.

| Field | Type | Description |
|-------|------|-------------|
| `wallet_address` | String (FK) | Links to Users table. |
| `title` | String | Title of the stream. |
| `description` | Text | Long description of the stream content. |
| `category` | String | e.g., "gaming", "tech", "music". |
| `tags` | String | Comma-separated tags (e.g., "web3, coding"). |
| `last_live_at` | Timestamp | (Optional) When they last went live. |

> **Note on Livepeer API Key**: The frontend currently implements a "Bring Your Own Key" (BYOK) model where the key is stored in the user's browser `localStorage`. We **DO NOT** need to store this in the database for now to avoid security risks.

## 2. API Endpoints Needed
The frontend expects the following REST endpoints. You can implement these in a separate backend (Node/Express, Python/FastAPI) or as Next.js API Routes connecting to the DB.

### Profile Management

#### `GET /api/users/:address`
*   **Purpose**: Fetch a user's profile by their wallet address.
*   **Response**:
    ```json
    {
      "username": "juan123",
      "displayName": "Juan Crypto",
      "bio": "Welcome to my channel",
      "avatarUrl": "https://..."
    }
    ```

#### `POST /api/users/:address`
*   **Purpose**: Create or update a user's profile.
*   **Body**:
    ```json
    {
      "username": "juan123",
      "displayName": "Juan Crypto",
      "bio": "...",
      "avatarUrl": "..."
    }
    ```
*   **Validation**: Ensure `username` is unique.

#### `GET /api/users/by-username/:username`
*   **Purpose**: Resolve a public username to a profile (for the `/c/[username]` page).
*   **Response**: Same as `GET /api/users/:address`, but must include `wallet_address`.

### Stream Settings

#### `GET /api/settings/streamer/:address`
*   **Purpose**: Get the saved stream title, tags, etc.
*   **Response**:
    ```json
    {
      "title": "My Awesome Stream",
      "description": "Playing games...",
      "category": "gaming",
      "tags": "rpg, strategy"
    }
    ```

#### `POST /api/settings/streamer/:address`
*   **Purpose**: Save stream metadata.
*   **Body**: Same fields as response.

## 3. Integration Priorities
1.  **Profile Persistence**: We need the `username` to be unique and persistent so users can share their `/c/username` link.
2.  **Stream Metadata**: So users don't have to re-type their title every time they refresh the dashboard.
