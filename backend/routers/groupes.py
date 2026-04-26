from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

router = APIRouter()

@router.get("/")
def get_groupes(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT * FROM groupe"))
    return result.mappings().all()
