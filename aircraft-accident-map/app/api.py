from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from .db import SessionLocal
from .models import Accident

router = APIRouter(prefix="/api/accidents", tags=["accidents"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=list)
def list_by_year(
        year: int = Query(..., ge=1900),
        db: Session = Depends(get_db)
):
    return (
        db.query(Accident)
        .filter(Accident.year == year)
        .limit(5000)
        .all()
    )
