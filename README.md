# Blog Application API

This is a RESTful API for managing users, posts, and comments in a blogging platform. It allows for user authentication, creating and managing blog posts, and adding comments.

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Posts](#posts)
  - [Comments](#comments)
- [Testing the API with Postman](#testing-the-api-with-postman)
  - [Register a User](#register-a-user)
  - [Login a User](#login-a-user)
  - [Create a Post](#create-a-post)
  - [Get All Posts](#get-all-posts)
  - [Get a Single Post](#get-a-single-post)
  - [Update a Post](#update-a-post)
  - [Delete a Post](#delete-a-post)
  - [Add a Comment to a Post](#add-a-comment-to-a-post)
  - [Get Comments for a Post](#get-comments-for-a-post)
  - [Delete a Comment](#delete-a-comment)
- [Authorization](#authorization)
- [Contact](#contact)

## Technologies

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- JWT for authentication

## Setup

### 1. Clone the repository:

```bash
git clone https://github.com/DIp15739/blog-task-tender247-backend

cd blog-task-tender247-backend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Set up the database:

Ensure MySQL is running and create the database:

```sql
CREATE DATABASE my_blog;
```

### 4. Configure environment variables:

Create a `.env` file in the root directory and add the following values:

```
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=my_blog
JWT_SECRET=your_jwt_secret
```

### 5. Run database migrations:

```bash
npm mirgate:up
```

### 6. Start the server:

```bash
npm run dev
```

Your API will be running on `http://localhost:3001`.

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login a user        |

### Posts

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| GET    | `/api/post`     | Get all posts (with filters) |
| GET    | `/api/post/:id` | Get a single post by ID      |
| POST   | `/api/post`     | Create a new post (auth)     |
| PUT    | `/api/post/:id` | Update a post (auth)         |
| DELETE | `/api/post/:id` | Delete a post (auth)         |

### Comments

| Method | Endpoint                        | Description                 |
| ------ | ------------------------------- | --------------------------- |
| GET    | `/api/post/:postId/comments`    | Get all comments for a post |
| POST   | `/api/post/:postId/comments`    | Add a comment to a post     |
| DELETE | `/api/post/comments/:commentId` | Delete a comment (auth)     |

---

## Testing the API with Postman

### Register a User

**Endpoint:** `/api/auth/register`  
**Method:** `POST`

**Request Body Example:**

```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

**Response Example (Success):**

```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

---

### Login a User

**Endpoint:** `/api/auth/login`  
**Method:** `POST`

**Request Body Example:**

```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

**Response Example (Success):**

```json
{
  "token": "your_jwt_token"
}
```

Copy the `token` from the response and use it in the Authorization header (Bearer Token) for the following requests that require authentication.

---

### Create a Post

**Endpoint:** `/api/post`  
**Method:** `POST`  
**Authentication:** `Bearer <your_token>`

**Request Body Example:**

```json
{
  "title": "My First Post",
  "content": "This is the content of my first post."
}
```

**Response Example (Success):**

```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "userId": 1,
  "isDeleted": false,
  "createdAt": "2024-10-17T07:30:00.000Z",
  "updatedAt": "2024-10-17T07:30:00.000Z"
}
```

---

### Get All Posts

**Endpoint:** `/api/post`  
**Method:** `GET`

**Query Parameters (Optional):**

- `search`: Filter posts by title (e.g., `search=first`)
- `page`: Pagination (default is 1)
- `limit`: Limit the number of posts (default is 10)
- `username`: Filter posts by the author's username (e.g., `username=testuser`)

**Response Example:**

```json
[
  {
    "id": 1,
    "title": "My First Post",
    "content": "This is the content of my first post.",
    "author": {
      "username": "testuser"
    },
    "comments": []
  }
]
```

---

### Get a Single Post

**Endpoint:** `/api/post/:id`  
**Method:** `GET`

**Response Example:**

```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "author": {
    "username": "testuser"
  },
  "comments": []
}
```

---

### Update a Post

**Endpoint:** `/api/post/:id`  
**Method:** `PUT`  
**Authentication:** `Bearer <your_token>`

**Request Body Example:**

```json
{
  "title": "Updated Post Title",
  "content": "Updated content."
}
```

**Response Example (Success):**

```json
{
  "id": 1,
  "title": "Updated Post Title",
  "content": "Updated content.",
  "userId": 1,
  "isDeleted": false,
  "createdAt": "2024-10-17T07:30:00.000Z",
  "updatedAt": "2024-10-17T07:45:00.000Z"
}
```

---

### Delete a Post

**Endpoint:** `/api/post/:id`  
**Method:** `DELETE`  
**Authentication:** `Bearer <your_token>`

**Response Example (Success):**

```json
{
  "message": "Post deleted"
}
```

---

### Add a Comment to a Post

**Endpoint:** `/api/post/:postId/comments`  
**Method:** `POST`

**Request Body Example:**

```json
{
  "content": "This is a comment."
}
```

**Response Example (Success):**

```json
{
  "id": 1,
  "content": "This is a comment.",
  "postId": 1,
  "isDeleted": false,
  "createdAt": "2024-10-17T07:30:00.000Z",
  "updatedAt": "2024-10-17T07:30:00.000Z"
}
```

---

### Get Comments for a Post

**Endpoint:** `/api/post/:postId/comments`  
**Method:** `GET`

**Response Example:**

```json
[
  {
    "id": 1,
    "content": "This is a comment.",
    "postId": 1,
    "isDeleted": false
  }
]
```

---

### Delete a Comment

**Endpoint:** `/api/post/comments/:commentId`  
**Method:** `DELETE`  
**Authentication:** `Bearer <your_token>`

**Response Example (Success):**

```json
{
  "message": "Comment deleted"
}
```

---

## Authorization

- All `POST`, `PUT`, and `DELETE` requests for posts and comments require the user to be logged in and authenticated via a Bearer Token (`JWT`).
- Include the token in the Authorization header in Postman:

```
Authorization: Bearer <your_token>
```

---
