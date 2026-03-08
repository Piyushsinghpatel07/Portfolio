# 🚀 Piyush Singh Patel — Portfolio Website

A production-ready, full-stack portfolio website built with **React + Vite**, **FastAPI**, **MongoDB**, and **Docker**.

---

## 📁 Project Structure

```
portfolio/
├── frontend/               # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── sections/
│   │   │       ├── Hero.jsx
│   │   │       ├── About.jsx
│   │   │       ├── Skills.jsx
│   │   │       ├── Projects.jsx
│   │   │       └── Contact.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   ├── profile.jpg       ← Add your profile photo here
│   │   └── resume.pdf        ← Add your resume here
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── vercel.json
│   └── .env
├── backend/                # Python FastAPI
│   ├── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env
├── docker-compose.yml
└── README.md
```

---

## ⚡ Quick Start (Local Dev)

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

### Backend
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
API docs: http://localhost:8000/docs

---

## 🐳 Docker Setup (Full Stack)

```bash
# From project root
docker-compose up --build
```

| Service   | URL                        |
|-----------|----------------------------|
| Frontend  | http://localhost:3000       |
| Backend   | http://localhost:8000       |
| API Docs  | http://localhost:8000/docs  |
| MongoDB   | localhost:27017             |

---

## 🔗 API Endpoints

| Method | Endpoint   | Description                     |
|--------|------------|---------------------------------|
| GET    | `/`        | Health check                    |
| POST   | `/contact` | Save contact message to MongoDB |
| GET    | `/projects`| Retrieve all projects           |
| GET    | `/skills`  | Retrieve all skills             |

---

## 🌐 Deployment

### Frontend → Vercel
1. Push `frontend/` to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Set **Framework**: Vite
4. Set env variable: `VITE_API_URL=https://your-backend-url.com`
5. Deploy ✅

### Backend → Docker (VPS/Cloud)
```bash
cd backend
docker build -t portfolio-backend .
docker run -d -p 8000:8000 -e MONGODB_URL=mongodb://<your-mongo-host>:27017 portfolio-backend
```

---

## 📸 Assets to Add

| File                     | Description           |
|--------------------------|-----------------------|
| `frontend/public/profile.jpg` | Your profile photo   |
| `frontend/public/resume.pdf`  | Your resume file     |
| `frontend/public/project1.png`| Screenshot project 1 |
| `frontend/public/project2.png`| Screenshot project 2 |
| `frontend/public/project3.png`| Screenshot project 3 |

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite 7, Tailwind CSS v4, Framer Motion
- **Backend**: Python 3.12, FastAPI, Motor (async MongoDB)
- **Database**: MongoDB 7
- **DevOps**: Docker, Docker Compose, Nginx
- **Deploy**: Vercel (frontend), Docker container (backend)

---

## 🎨 Design

Dark purple/violet theme with neon glow effects, glassmorphism cards, Framer Motion animations, and floating tech icons — replicating the provided reference screenshots.
