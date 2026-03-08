from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGODB_URL)
db = client["portfolio"]

# Mail Configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_FROM_NAME=os.getenv("MAIL_FROM_NAME"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

# ─── Pydantic Models ────────────────────────────────────────────────────────
class ContactMessage(BaseModel):
    name: str
    email: str
    message: str


class ContactResponse(BaseModel):
    success: bool
    message: str


class TechItem(BaseModel):
    name: str
    color: str
    level: int


class SkillCategory(BaseModel):
    title: str
    skills: List[TechItem]


class Project(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    tech: List[str]
    category: str
    repo: str
    demo: str
    image: Optional[str] = None


# ─── Startup seed data ─────────────────────────────────────────────────────
@app.on_event("startup")
async def seed_data():
    # Seed projects if empty
    if await db["projects"].count_documents({}) == 0:
        projects = [
            {
                "title": "StrategyHub – AI Business Insights Platform",
                "description": "StrategyHub is an AI-powered SaaS platform that generates business insights, market research, and strategic recommendations using Generative AI.",
                "tech": ["React", "FastAPI", "Python", "Docker", "Generative AI"],
                "category": "web",
                "repo": "https://github.com/piyush",
                "demo": "#",
                "image": "/project1.png",
            },
            {
                "title": "Plannest – AI Business Strategy Generator",
                "description": "Plannest is an AI-driven platform designed to generate complete business strategies based on user inputs using Generative AI models.",
                "tech": ["React", "Tailwind", "FastAPI", "Python", "Docker", "Generative AI"],
                "category": "ai",
                "repo": "https://github.com/piyush",
                "demo": "#",
                "image": "/project2.png",
            },
            {
                "title": "AI Chatbot Assistant",
                "description": "An AI-powered chatbot capable of answering questions, generating insights, and assisting users with intelligent conversations.",
                "tech": ["React", "FastAPI", "Python", "MongoDB", "Generative AI APIs"],
                "category": "ai",
                "repo": "https://github.com/piyush",
                "demo": "#",
                "image": "/project3.png",
            },
        ]
        await db["projects"].insert_many(projects)

    # Seed skills if empty
    if await db["skills"].count_documents({}) == 0:
        skills = [
            {
                "title": "Frontend",
                "skills": [
                    {"name": "HTML", "color": "#E34F26", "level": 9},
                    {"name": "CSS", "color": "#1572B6", "level": 8},
                    {"name": "JavaScript", "color": "#F7DF1E", "level": 8},
                    {"name": "React.js", "color": "#61DAFB", "level": 9},
                    {"name": "Tailwind CSS", "color": "#38BDF8", "level": 8},
                ],
            },
            {
                "title": "Backend",
                "skills": [
                    {"name": "Python", "color": "#3776AB", "level": 9},
                    {"name": "FastAPI", "color": "#009688", "level": 8},
                    {"name": "Node.js", "color": "#339933", "level": 6},
                    {"name": "Express.js", "color": "#ffffff", "level": 6},
                ],
            },
            {
                "title": "Database",
                "skills": [
                    {"name": "MongoDB", "color": "#47A248", "level": 7},
                ],
            },
            {
                "title": "DevOps / Tools",
                "skills": [
                    {"name": "Docker", "color": "#2496ED", "level": 7},
                    {"name": "Git", "color": "#F05032", "level": 8},
                    {"name": "GitHub", "color": "#ffffff", "level": 8},
                    {"name": "VS Code", "color": "#007ACC", "level": 9},
                ],
            },
            {
                "title": "AI / LLM",
                "skills": [
                    {"name": "Prompt Engineering", "color": "#a855f7", "level": 8},
                    {"name": "Generative AI", "color": "#ec4899", "level": 7},
                    {"name": "AI API Integration", "color": "#8b5cf6", "level": 8},
                ],
            },
        ]
        await db["skills"].insert_many(skills)


# ─── Routes ────────────────────────────────────────────────────────────────
@app.get("/", tags=["Health"])
async def root():
    return {"status": "Portfolio API is running 🚀"}


@app.post("/contact", response_model=ContactResponse, tags=["Contact"])
async def send_message(contact: ContactMessage, background_tasks: BackgroundTasks):
    try:
        # 1. Save to MongoDB
        doc = {
            **contact.model_dump(),
            "created_at": datetime.utcnow(),
            "read": False,
        }
        await db["contacts"].insert_one(doc)

        # 2. Send Email (in background)
        email_content = f"""
        <h3>New Contact Message from Portfolio</h3>
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Message:</strong></p>
        <p>{contact.message}</p>
        """

        message = MessageSchema(
            subject=f"New Portfolio Message from {contact.name}",
            recipients=[os.getenv("MAIL_FROM")],
            body=email_content,
            subtype=MessageType.html
        )

        fm = FastMail(conf)
        background_tasks.add_task(fm.send_message, message)

        return ContactResponse(success=True, message="Message sent successfully!")
    except Exception as e:
        print(f"Error sending message: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/projects", response_model=List[dict], tags=["Projects"])
async def get_projects():
    projects = []
    async for p in db["projects"].find({}, {"_id": 0}):
        projects.append(p)
    return projects


@app.get("/skills", response_model=List[dict], tags=["Skills"])
async def get_skills():
    skills = []
    async for s in db["skills"].find({}, {"_id": 0}):
        skills.append(s)
    return skills
