# FreeSiksha LMS Deployment & Setup Guide

## Local Setup
1. **Clone & Install**
   ```bash
   npm install # in root (to install deps if any)
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Environment Variables**
   - Configure `backend/.env` using `backend/.env.example`.
   - Configure `frontend/.env` using `frontend/.env.example`.

3. **Run Development**
   - Backend: `cd backend && npm run dev` (Ensure `nodemon` is installed or update scripts)
   - Frontend: `cd frontend && npm run dev`

## Production Deployment

### Backend (Render / Heroku)
- Set Environment variables in the dashboard.
- Build Command: `npm install`
- Start Command: `node server.js`

### Frontend (Vercel / Netlify)
- Set `VITE_API_URL` to your backend URL.
- Build Command: `npm run build`
- Output Directory: `dist`

### Database (MongoDB Atlas)
- Create a Cluster.
- Whitelist all IP addresses (0.0.0.0/0) or specify server IP.
- Copy Connection String to `MONGO_URI`.

### Storage & Auth (Firebase)
- Enabled Authentication (Email/Google).
- Enable Cloud Storage.
- Download `serviceAccountKey.json` for backend.
- Copy Client Config for frontend.
 Broadway
