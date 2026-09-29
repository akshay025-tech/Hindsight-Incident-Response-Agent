from fastapi import APIRouter

from hindsight.recall import recall_memory
from hindsight.reflect import reflect_memory

router = APIRouter(prefix='/memory', tags=['Memory'])


@router.get('/ping')
def ping():
    return {'message': 'memory router working'}


@router.get('/recall')
def recall(query: str = ''):
    return recall_memory(query)


@router.post('/reflect')
def reflect():
    return reflect_memory()
