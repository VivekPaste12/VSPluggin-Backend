---

# Backend API Documentation

This backend provides user authentication and prompt usage tracking using JWT. It integrates with systems like VSCode extensions.

## Project Structure

```
├── controllers
│   └── authController.js
├── middleware
│   └── authMiddleware.js
├── models
│   └── User.js
├── utils
│   └── jwt.js
└── routes
    └── authRoutes.js
```

---

## API Endpoints

### 1. **POST /signup**

Authenticates a user and returns a session token.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Success Response:**

```json
{
  "message": "User signed up successfully",
  "sessionToken": "<JWT_TOKEN>"
}
```

**Error Responses:**

- `400` – Email is required.
- `404` – User not found.
- `500` – Internal server error.

**Step-by-Step:**

1. Check if the email is provided.
2. Find the user using the email.
3. If found, generate and return a session token.
4. Handle errors appropriately.

### 2. **POST /trackUsage (Protected)**

Increments a user's usage and token count.

**Headers:**

Authorization: Bearer `<JWT_TOKEN>`

**Request Body:**

```json
{
  "usage": 1,
  "tokenCount": 1
}
```

**Success Response:**

```json
{
  "message": "Usage tracked successfully",
  "currentPromptCount": "<new_prompt_count>",
  "currentTokenCount": "<new_token_count>",
  "threshold": 10
}
```

**Error Responses:**

- `401` – Missing or malformed token.
- `403` – Token invalid or expired.
- `404` – User not found.
- `500` – Failed to track usage.

**Step-by-Step:**

1. Extract the user from the token.
2. Find the user by email.
3. Validate and increment usage and token counts.
4. Return updated counts.
5. Handle errors properly.

---

## Authentication Flow

- **Token Generation:**
  - Uses `generateToken({ userId, email, apiKey })`.
  - Expires in 30 days.

- **Token Verification:**
  - Uses `verifyToken(token)`.

---

## User Schema

```json
{
  "email": "String",
  "apiKey": "String",
  "tokenCount": "Number",
  "promptCount": "Number",
  "createdAt": "Date"
}
```

---

## Environment Variables

Ensure the following are set:

- `API_KEY=your_openai_api_key`
- `JWT_SECRET=your_jwt_secret`

---

## Security Notes

- JWTs expire in 30 days and prevent unauthorized access.
- Default values ensure data integrity.
- Consider more secure authentication methods for production use.

---
