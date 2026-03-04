# How to Run the MERN Stack Application

## Prerequisites
- Node.js (v14 or higher) installed
- MongoDB Atlas account (already configured with your credentials)

## Running the Application

### Option 1: Run Both Separately (Recommended)

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

### Option 2: Using Root Scripts

**Install all dependencies (first time only):**
```bash
npm run install:all
```

**Run backend only:**
```bash
npm run dev:backend
```

**Run frontend only:**
```bash
npm run dev:frontend
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| POST | `/api/items` | Create new item |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |
| GET | `/api/health` | Health check |

## Features

- Add items with name and description
- Edit items (click Edit button, modify fields, click Save)
- Delete items
- View all items
- Responsive design with Tailwind CSS
