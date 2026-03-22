# Spotify Backend API

This is the backend API for a Spotify-like music application built with Node.js, Express, and MongoDB. It provides authentication and music management features.

## Base URL
```
http://localhost:3000/api
```

## Authentication
The API uses JWT tokens for authentication. Include the token in cookies for protected routes.

## Endpoints

### 1. User Registration
**POST** `/auth/register`

Register a new user.

#### Request Body
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "user" // optional, defaults to "user"
}
```

#### Success Response (201)
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email",
    "role": "user"
  }
}
```

#### Error Responses
- **400 Bad Request**: Missing required fields
```json
{
  "success": false,
  "message": "All fields are required"
}
```
- **409 Conflict**: User already exists
```json
{
  "success": false,
  "message": "User already exists with that email or username"
}
```
- **500 Internal Server Error**: Server error
```json
{
  "success": false,
  "message": "Server error during registration",
  "error": "error_message"
}
```

### 2. User Login
**POST** `/auth/login`

Authenticate a user.

#### Request Body
```json
{
  "username": "string", // or email
  "email": "string",    // or username
  "password": "string"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "message": "Login successful",
  "role": "user"
}
```

#### Error Responses
- **404 Not Found**: Invalid credentials
```json
{
  "success": false,
  "message": "invalid credentials"
}
```

### 3. Upload Music
**POST** `/music/upload`

Upload a music file. Requires artist role.

#### Request
- Content-Type: `multipart/form-data`
- Fields:
  - `title`: string
  - `music`: file (audio file)

#### Success Response (201)
```json
{
  "message": "file uploaded successfully",
  "music": {
    "_id": "music_id",
    "uri": "uploaded_file_url",
    "title": "song_title",
    "artist": "artist_id"
  }
}
```

#### Error Responses
- **401 Unauthorized**: No token or invalid token
```json
{
  "message": "unauthorized"
}
```
- **403 Forbidden**: Not an artist
```json
{
  "message": "you don't have permission to create music"
}
```

### 4. Create Album
**POST** `/music/album`

Create a new album. Requires artist role.

#### Request Body
```json
{
  "title": "string",
  "musics": ["music_id1", "music_id2"] // array of music ObjectIds
}
```

#### Success Response (201)
```json
{
  "id": "album_id",
  "title": "album_title",
  "artist": "artist_id",
  "musics": ["music_id1", "music_id2"]
}
```

#### Error Responses
- **401 Unauthorized**: No token or invalid token
```json
{
  "message": "unauthorized"
}
```
- **403 Forbidden**: Not an artist
```json
{
  "message": "you don't have permission to create music"
}
```

## Environment Variables
- `JWT_SECRET`: Secret key for JWT
- `JWT_SECRET_KEY`: Alternative secret key
- `IMAGEKIT_PRIVATE_KEY`: Private key for ImageKit
- `MONGODB_URI`: MongoDB connection string

## Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start the server: `npm start`