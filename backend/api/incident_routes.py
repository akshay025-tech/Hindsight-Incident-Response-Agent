from fastapi import APIRouter
from pydantic import BaseModel
from utils.supabase_client import supabase

router = APIRouter()


class Incident(BaseModel):
    title: str
    description: str | None = None
    severity: str | None = None
    status: str = "open"
    source: str | None = None


@router.post("/incidents")
def create_incident(incident: Incident):

    response = (
        supabase
        .table("incidents")
        .insert(incident.model_dump())
        .execute()
    )

    return response.data