# MERN Stack Application

A minimal MERN (MongoDB, Express, React, Node.js) application with Vite and Tailwind CSS.

## Project Structure

```
mern-app/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── index.css
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB account (Atlas)

## Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up MongoDB:**
   - Open `backend/.env.example`
   - Copy it to `.env` and add your MongoDB password:
   ```bash
   cp backend/.env.example backend/.env
   ```
   - Edit `.env` and replace `your_password_here` with your actual MongoDB password

## Running the Application

### Development Mode (Both Frontend & Backend)

**Terminal 1 - Backend (Port 5000):**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend (Port 3000):**
```bash
cd frontend
npm run dev
```

### Or use root scripts:
```bash
# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend
```

## Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| POST | `/api/items` | Create new item |
| DELETE | `/api/items/:id` | Delete item |
| GET | `/api/health` | Health check |

## Features

- Add items with name and description
- View all items
- Delete items
- Responsive design with Tailwind CSS
- Proxy configuration for API calls
