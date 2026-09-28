import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client, Client

# backend/.env
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(env_path, override=True)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL is missing")

if not SUPABASE_KEY:
    raise ValueError("SUPABASE_KEY is missing")

supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)