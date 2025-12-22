from pydantic import BaseModel
from typing import Optional


class AccidentOut(BaseModel):
    id: int
    year: int
    event_date: Optional[str]
    location: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]

    class Config:
        from_attributes = True
