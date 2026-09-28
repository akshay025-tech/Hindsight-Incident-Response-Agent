from fastapi import FastAPI

from api.incident_routes import router as incident_router
from api.agent_routes import router as agent_router
from api.memory_routes import router as memory_router

app = FastAPI(title="Incident Response Agent")


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(incident_router)
app.include_router(agent_router)
app.include_router(memory_router)