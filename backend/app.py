from dotenv import load_dotenv

# Load .env BEFORE importing anything that uses Supabase
load_dotenv()

from fastapi import FastAPI
from api.incident_routes import router as incident_router

app = FastAPI(
    title="Incident Response Agent"
)

app.include_router(
    incident_router,
    prefix="/api"
)

@app.get("/")
def root():
    return {
        "message": "Incident Response Agent API"
    }