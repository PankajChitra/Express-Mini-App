# Notes API Monorepo

This repository is organized as a monorepo with separate apps for API and client.

## Structure

```text
.
├── Backend/   # Express + MongoDB API
└── Frontend/  # Vite + React app
```

## App Setup

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

## Monorepo Scripts (from root)

Install root tooling:

```bash
npm install
```

Install both app dependencies:

```bash
npm run install:all
```

Run one app:

```bash
npm run dev:backend
npm run dev:frontend
```

Run both apps together:

```bash
npm run dev
```

## Environment Files

- Backend env file should be placed at `Backend/.env`.
- Frontend env file should be placed at `Frontend/.env` if needed.
- Frontend API URL can be set with `VITE_API_URL`.

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
