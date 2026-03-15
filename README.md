# 📝 Notes API — Express.js

A clean, production-ready REST API built from scratch using **Node.js** 
and **Express.js** — structured with the **MVC pattern** that real 
companies actually use.

## 🚀 Features
- Full **CRUD** operations (Create, Read, Update, Delete)
- **MVC Architecture** — routes, controllers, middleware separated cleanly
- **Input Validation** with express-validator
- **Custom Logger Middleware** — logs every request method + URL
- **Global Error Handler** — catches all errors in one place
- **Environment Variables** with dotenv
- Tested with **Postman** across all routes + edge cases

## 🛠️ Tech Stack
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)

## 📁 Project Structure
\`\`\`
notes-api/
├── server.js
├── .env
├── routes/
│   └── noteRoutes.js
├── controllers/
│   └── noteController.js
└── middleware/
    ├── logger.js
    └── errorHandler.js
\`\`\`

## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/notes | Get all notes |
| GET | /api/notes/:id | Get note by ID |
| POST | /api/notes | Create a new note |
| PUT | /api/notes/:id | Update a note |
| DELETE | /api/notes/:id | Delete a note |

## ⚙️ Setup & Run
\`\`\`bash
git clone https://github.com/PankajChitra/notes-api-express
cd notes-api-express
npm install
npm run dev
\`\`\`
> Add a \`.env\` file with \`PORT=3000\`
