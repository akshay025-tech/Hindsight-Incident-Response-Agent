from fastapi import APIRouter

router = APIRouter(prefix="/memory", tags=["Memory"])


@router.get("/ping")
def ping():
    return {"message": "memory router working"}