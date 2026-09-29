import os

class DummySupabaseClient:
    def table(self, _name):
        return self

    def insert(self, _payload):
        return self

    def execute(self):
        return type('Response', (), {'data': []})()


SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

supabase = DummySupabaseClient() if not SUPABASE_URL or not SUPABASE_KEY else None
