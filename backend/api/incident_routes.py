from fastapi import APIRouter

router = APIRouter(prefix="/incidents", tags=["Incidents"])


@router.get("/ping")
def ping():
    return {"message": "incident router working"}