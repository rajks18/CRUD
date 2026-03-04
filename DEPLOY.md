# Deploy to Vercel

## Option 1: Deploy Frontend Only (Recommended for MERN)

The frontend can be deployed to Vercel. For the backend, you'll need to deploy it separately.

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy Frontend
```bash
cd frontend
vercel
```

Follow the prompts:
- Set up and deploy? Yes
- Which scope? Your Vercel account
- Link to existing project? No
- Project name: your-project-name
- Directory? ./
- Want to modify settings? No

### Step 3: Deploy Backend

For the backend, you have several options:

**Option A: Render.com (Free)**
1. Push your code to GitHub
2. Connect your GitHub repo to Render
3. Create a new Web Service
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variable: `MONGO_URI` with your MongoDB connection string

**Option B: Railway**
1. Go to railway.app
2. Connect your GitHub repo
3. Create a new project
4. Add MongoDB plugin
5. Deploy

**Option C: Vercel Serverless Functions**
Create a `/api` folder in the frontend and add serverless functions.

---

## Option 2: Deploy Everything on Vercel (Serverless)

### Step 1: Create API Routes
Create a `api` folder in the frontend directory:

```
frontend/
├── api/
│   ├── items.js
├── src/
├── package.json
└── vercel.json
```

### Step 2: Create vercel.json
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}
```

### Step 3: Create API Route (example)
```javascript
// api/items.js
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);

export default async function handler(req, res) {
  const mongoUri = process.env.MONGO_URI;
  
  if (!mongoose.connection.readyState) {
    await mongoose.connect(mongoUri);
  }

  if (req.method === 'GET') {
    const items = await Item.find();
    res.json(items);
  } else if (req.method === 'POST') {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  }
}
```

### Step 4: Deploy
```bash
cd frontend
vercel
```

### Step 5: Add Environment Variable
In Vercel dashboard, go to:
- Settings → Environment Variables
- Add: `MONGO_URI` = your MongoDB connection string

---

## Quick Deploy Steps

1. **Push code to GitHub**
2. **Go to vercel.com**
3. **Import repository**
4. **Configure:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Add environment variable:** `MONGO_URI`
6. **Deploy!**

For the backend, use Render.com (free):
1. Sign up at render.com
2. Connect GitHub
3. Create Web Service
4. Set build: `npm install`
5. Set start: `node server.js`
6. Add MongoDB URI as environment variable
