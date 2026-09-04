from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from models.base import Base, engine
from routes import auth, symptoms, history


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create DB tables on startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title="Nivāran API",
    description="AI-powered health symptom analyzer — Nivāran",
    version="1.0.0",
    lifespan=lifespan,
)

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(symptoms.router, prefix="/symptoms", tags=["Symptoms"])
app.include_router(history.router, prefix="/history", tags=["History"])


@app.get("/")
async def root():
    return {"message": "Nivāran API is running 🩺"}
