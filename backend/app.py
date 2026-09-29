from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.agent_routes import router as agent_router
from api.incident_routes import router as incident_router
from api.memory_routes import router as memory_router
from api.postmortem_routes import router as postmortem_router

app = FastAPI(title='Incident Response Agent')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173', 'http://127.0.0.1:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(incident_router, prefix='/api')
app.include_router(agent_router, prefix='/api')
app.include_router(memory_router, prefix='/api')
app.include_router(postmortem_router, prefix='/api')

@app.get('/')
def root():
    return {'message': 'Incident Response Agent API'}

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.get('/incidents/ping')
def incident_ping():
    return {'message': 'incident router working'}

@app.get('/agents/ping')
def agent_ping():
    return {'message': 'agent router working'}

@app.get('/memory/ping')
def memory_ping():
    return {'message': 'memory router working'}
