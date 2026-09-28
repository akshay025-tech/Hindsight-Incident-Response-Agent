from fastapi import APIRouter

router = APIRouter(prefix="/agents", tags=["Agents"])


@router.get("/ping")
def ping():
    return {"message": "agent router working"}