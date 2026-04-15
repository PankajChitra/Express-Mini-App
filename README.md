# Notes API

A secure, scalable REST API for managing personal notes — built with Node.js, Express.js, and MongoDB. Includes JWT authentication, role-based access control, and a React.js frontend.

**Live Demo**
- Frontend: https://notesapi-tau.vercel.app
- Backend: https://notes-api-oyhd.onrender.com

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES Modules) |
| Framework | Express.js v5 |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcryptjs |
| Validation | express-validator |
| Security | helmet, cors, express-rate-limit |
| Frontend | React.js + Vite + Axios |

---

## Features

- User registration and login with hashed passwords
- JWT-based authentication with protected routes
- Role-based access control — `user` and `admin` roles
- Full CRUD for notes (title, body, category, color)
- Admin-only routes to view and delete any user's notes
- Input validation and sanitization on all endpoints
- Rate limiting, CORS, and security headers via helmet

---

## Project Structure

```
express-mini-app/
├── controller/
│   ├── controller.js       # Notes CRUD + admin controllers
│   └── user.js             # Register & login logic
├── DB/
│   └── Index.js            # MongoDB connection
├── middleware/
│   ├── authmiddleware.js   # protect + authorizeRoles
│   ├── logger.js
│   └── errorhandler.js
├── model/
│   ├── user.js             # User schema (name, email, password, role)
│   └── notemodule.js       # Note schema
├── routes/
│   ├── authRoute.js        # /api/auth
│   └── routes.js           # /api/notes
├── server.js
├── postman_collection.json
└── .env.example
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas URI or local MongoDB

### Installation

```bash
git clone https://github.com/PankajChitra/Express-Mini-App.git
cd Express-Mini-App
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
MONGO_URI=your_mongodb_atlas_uri
ACCESS_TOKEN_SECRET=your_jwt_secret
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Run Locally

```bash
# Development
npm run dev

# Production
npm start
```

Server runs at `http://localhost:3000`

---

## API Reference

### Auth Routes

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT | No |

### Notes Routes

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/notes` | Get all your notes | User |
| GET | `/api/notes/:id` | Get a note by ID | User |
| POST | `/api/notes` | Create a note | User |
| PUT | `/api/notes/:id` | Update a note | User |
| DELETE | `/api/notes/:id` | Delete your note | User |

### Admin Routes

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/notes/admin/all` | Get all users' notes | Admin |
| DELETE | `/api/notes/admin/:id` | Delete any note | Admin |

---

## Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

**Role-based access** is enforced via the `authorizeRoles` middleware. Accessing admin routes with a `user` role returns `403 Forbidden`.

---

## API Documentation

Import `postman_collection.json` from the repo root into Postman.

Steps:
1. Call `POST /api/auth/login` — token is auto-saved to collection variable
2. All protected requests are pre-configured with `{{token}}`
3. Use the Admin folder requests with an admin-role account

To make a user an admin, update their `role` field to `"admin"` directly in MongoDB Atlas or Compass.

---

## Scalability Notes

This project is structured for straightforward horizontal scaling:

**Modular architecture** — controllers, routes, models, and middleware are fully decoupled. Adding a new resource (e.g. tasks, files) requires only a new controller + route file with zero changes to existing code.

**Stateless JWT auth** — no server-side sessions. Any number of instances can handle requests without shared session state, making horizontal scaling behind a load balancer (e.g. Nginx, AWS ALB) seamless.

**MongoDB Atlas** — managed, cloud-native database with built-in replication and auto-scaling. Mongoose connection pooling handles concurrent requests efficiently.

**Rate limiting** — `express-rate-limit` is applied globally, protecting against abuse at the application layer. In production this would move to a Redis-backed store (e.g. `rate-limit-redis`) to share limits across multiple instances.

**Future enhancements:**
- Redis caching for frequently accessed notes
- API versioning (`/api/v1/`) for backward-compatible updates
- Docker + docker-compose for containerized deployment
- Microservices split: Auth Service / Notes Service with an API Gateway
- Logging with Winston + log aggregation (e.g. Datadog, Logtail)

---

## Security Practices

- Passwords hashed with `bcryptjs` (salt rounds: 10)
- JWT secrets stored in environment variables, never hardcoded
- `select: false` on password field — never returned in queries
- Input validated and sanitized via `express-validator`
- `helmet` sets secure HTTP headers
- `cors` restricts allowed origins to the frontend URL
- `express-rate-limit` prevents brute-force attacks

---

## Deployment

- **Backend** hosted on Render (auto-deploy from `main` branch)
- **Frontend** hosted on Vercel
- **Database** on MongoDB Atlas (M0 free tier, India region)
