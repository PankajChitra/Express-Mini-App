# 📝 Notes API — Express.js + MongoDB + JWT Auth

A production-ready REST API built from scratch using **Node.js**, **Express.js**,
and **MongoDB Atlas** — structured with **MVC architecture**, secured with 
**JWT Authentication**, and deployed live on Render.

## 🚀 Live Demo
🔗 **API Base URL:** `https://express-mini-app-1.onrender.com`

## ✨ Features
- Full **CRUD** operations — Create, Read, Update, Delete
- **JWT Authentication** — Register, Login, Protected Routes
- **MVC Architecture** — routes, controllers, middleware separated cleanly
- **MongoDB Atlas** — cloud database with Mongoose ODM
- **Input Validation** — express-validator on all POST/PUT routes
- **Mongoose Validation** — schema-level required, minlength, maxlength
- **Error Handling** — CastError, ValidationError, JWT errors handled globally
- **Pagination** — sort, limit, skip via query params
- **API Security** — helmet, cors, express-rate-limit
- **Environment Variables** — dotenv for all secrets
- Tested with **Postman** across all routes + edge cases

## 🛠️ Tech Stack
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)

## 📁 Project Structure
\`\`\`
notes-api/
├── server.js              # Entry point
├── .env                   # Environment variables (never committed)
├── .gitignore
├── routes/
│   ├── noteRoutes.js      # Note CRUD routes
│   └── authRoutes.js      # Register + Login routes
├── controllers/
│   ├── noteController.js  # Note business logic
│   └── authController.js  # Auth business logic
├── models/
│   ├── Note.js            # Note mongoose schema
│   └── User.js            # User mongoose schema
└── middleware/
    ├── authMiddleware.js  # JWT verification
    ├── logger.js          # Request logger
    └── errorHandler.js    # Global error handler
\`\`\`

## 📌 API Endpoints

### 🔐 Auth Routes (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login + get JWT token |

### 📝 Notes Routes (Protected — requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/notes | Get all notes |
| GET | /api/notes/:id | Get note by ID |
| POST | /api/notes | Create a new note |
| PUT | /api/notes/:id | Update a note |
| DELETE | /api/notes/:id | Delete a note |

### 🔍 Query Params (GET /api/notes)
\`\`\`
/api/notes?sort=asc        → sort by date ascending
/api/notes?limit=5         → return 5 notes max
/api/notes?page=2&limit=5  → pagination
\`\`\`

## ⚙️ Setup & Run Locally

\`\`\`bash
# 1. Clone the repo
git clone https://github.com/PankajChitra/notes-api-express.git
cd notes-api-express

# 2. Install dependencies
npm install

# 3. Create .env file
PORT=3000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret

# 4. Run development server
npm run dev
\`\`\`

## 🔑 Using Protected Routes in Postman
\`\`\`
1. POST /api/auth/register → { "name": "Pankaj", "email": "pankaj@gmail.com", "password": "123456" }
2. POST /api/auth/login    → copy the token from response
3. All /api/notes requests → Headers: Authorization: Bearer <token>
\`\`\`

## 🌐 Deployment
- **Backend** → [Render](https://render.com) (free tier)
- **Database** → [MongoDB Atlas](https://mongodb.com/atlas) (free M0 cluster)
