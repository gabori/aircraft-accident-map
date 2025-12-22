from sqlalchemy import Column, Integer, Float, String, Date
from .db import Base


class Accident(Base):
    __tablename__ = "accidents"

    id = Column(Integer, primary_key=True)
    event_id = Column(String, unique=True, index=True)
    event_date = Column(Date, index=True)
    year = Column(Integer, index=True)
    location = Column(String)
    country = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    injury_severity = Column(String)
    aircraft_damage = Column(String)
    aircraft_category = Column(String)
    make = Column(String)
    model = Column(String)
    total_fatal_injuries = Column(Integer)