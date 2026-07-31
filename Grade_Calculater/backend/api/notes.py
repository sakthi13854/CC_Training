from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter()

# In-memory store for prototyping (replace with SQLite/SQLAlchemy later)
NOTES_DB = []

class NoteCreate(BaseModel):
    title: str
    content: str

class NoteResponse(BaseModel):
    id: str
    title: str
    content: str
    created_at: str

@router.get("/notes", response_model=List[NoteResponse])
async def get_notes():
    return NOTES_DB

@router.post("/notes", response_model=NoteResponse)
async def create_note(note: NoteCreate):
    new_note = {
        "id": str(len(NOTES_DB) + 1),
        "title": note.title,
        "content": note.content,
        "created_at": datetime.now().isoformat()
    }
    NOTES_DB.append(new_note)
    return new_note

@router.delete("/notes/{note_id}")
async def delete_note(note_id: str):
    global NOTES_DB
    NOTES_DB = [n for n in NOTES_DB if n["id"] != note_id]
    return {"status": "success"}
