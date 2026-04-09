# 📝 Notes API

A full-stack Notes application with **JWT-based authentication** and a **RESTful API** backend. Users can register, log in, and manage their personal notes — all protected by secure token-based authorization.

---

## 🚀 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcrypt | Password hashing |
| ES Modules (`import/export`) | Modern JS syntax |

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Library |
| Axios / Fetch API | HTTP requests |
| React Router | Client-side routing |

---

## ✨ Features

- 🔐 **User Authentication** — Register & Login with JWT
- 📋 **CRUD Operations** — Create, Read, Update, Delete notes
- 🛡️ **Protected Routes** — Notes are user-specific; unauthorized access is blocked
- 🔑 **Auth Middleware** — Every protected endpoint validates the JWT token
- 🔍 **Search & Filter** — Search notes by title or content using query params
- 🗄️ **Persistent Storage** — Notes saved in MongoDB, tied to the logged-in user

---

## 📁 Project Structure

```
notes-api/
│
├── backend/
│   ├── controller/
│   │   ├── authController.js      # Register & Login logic
│   │   └── notesController.js     # CRUD logic for notes
│   │
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification middleware
│   │
│   ├── models/
│   │   ├── User.js                # User schema (Mongoose)
│   │   └── Note.js                # Note schema (Mongoose)
│   │
│   ├── routes/
│   │   ├── authRoute.js           # /api/auth — register, login
│   │   └── routes.js              # /api/notes — CRUD routes
│   │
│   ├── .env                       # Environment variables (not committed)
│   ├── package.json
│   └── index.js                   # App entry point
│
└── frontend/
    ├── src/
    │   ├── components/            # Reusable UI components
    │   ├── pages/                 # Login, Register, Dashboard
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── .env                       # Frontend env variables
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud URI)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/notes-api.git
cd notes-api
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

> 💡 Replace `your_mongodb_connection_string` with your MongoDB Atlas URI or `mongodb://localhost:27017/notesdb` for local MongoDB.

Start the backend server:

```bash
node index.js
```

The server will run at: `http://localhost:5000`

---

### 3. Setup the Frontend

Open a new terminal window:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ If you're using Create React App instead of Vite, use `REACT_APP_API_URL` instead.

Start the frontend dev server:

```bash
npm run dev
```

The app will run at: `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login & receive JWT token | ❌ |

#### Register — Request Body
```json
{
  "name": "Pankaj",
  "email": "pankaj@example.com",
  "password": "yourpassword"
}
```

#### Login — Request Body
```json
{
  "email": "pankaj@example.com",
  "password": "yourpassword"
}
```

#### Login — Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc...",
    "name": "Pankaj",
    "email": "pankaj@example.com"
  }
}
```

---

### Notes Routes — `/api/notes`

> 🔐 All notes routes require a valid JWT token in the `Authorization` header:
> ```
> Authorization: Bearer <your_token>
> ```

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/notes` | Get all notes of logged-in user |
| `GET` | `/api/notes?search=keyword` | Search notes by title or content |
| `POST` | `/api/notes` | Create a new note |
| `PUT` | `/api/notes/:id` | Update a note by ID |
| `DELETE` | `/api/notes/:id` | Delete a note by ID |

#### Create Note — Request Body
```json
{
  "title": "My First Note",
  "content": "This is the content of my note."
}
```

---

## 🧪 Testing the API

You can test all endpoints using [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) (VS Code extension):

1. Register a user → `POST /api/auth/register`
2. Login → `POST /api/auth/login` → Copy the returned `token`
3. Set `Authorization: Bearer <token>` in headers
4. Hit notes endpoints → `GET /api/notes`, `POST /api/notes`, etc.

---

## 🌐 Environment Variables Reference

### Backend `.env`
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/notesdb
JWT_SECRET=any_long_random_secret_string
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000
```

---

## 🔧 Common Issues & Fixes

| Issue | Fix |
|---|---|
| `MongoServerError: bad auth` | Check your `MONGO_URI` credentials in `.env` |
| `JWT malformed` or `invalid token` | Make sure you're sending `Bearer <token>` with the `Authorization` header |
| `CORS error` in browser | Ensure `cors` middleware is added in `index.js` |
| `Cannot use import outside module` | Add `"type": "module"` to `package.json` |
| Port already in use | Change `PORT` in `.env` or kill the existing process |

---

## 🛠️ Built By

**Pankaj** — 3rd Year IT Student @ J.C. Bose University of Science & Technology, YMCA

- 🔗 [LinkedIn](https://linkedin.com/in/your-profile)
- 💻 [GitHub](https://github.com/your-username)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
