from fastapi import APIRouter
from .services import get_accidents_by_year, get_stats_by_year

router = APIRouter(prefix="/api")

@router.get("/accidents")
def accidents(year: int):
    return get_accidents_by_year(year)

@router.get("/accidents/stats")
def stats(year: int):
    return get_stats_by_year(year)
