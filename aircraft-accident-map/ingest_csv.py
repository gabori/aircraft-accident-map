import csv
from datetime import datetime
from app.db import SessionLocal
from app.models import Accident

CSV_PATH = "app/data/aviation_accidents.csv"


def to_int(val):
    try:
        return int(val)
    except Exception:
        return None


db = SessionLocal()

with open(CSV_PATH, encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for r in reader:
        if not r.get("Latitude") or not r.get("Longitude"):
            continue

        try:
            date = datetime.strptime(r["Event.Date"], "%Y-%m-%d").date()
        except Exception:
            continue

        acc = Accident(
            event_id=r["Event.Id"],
            event_date=date,
            year=date.year,
            location=r.get("Location"),
            country=r.get("Country"),
            latitude=float(r["Latitude"]),
            longitude=float(r["Longitude"]),
            injury_severity=r.get("Injury.Severity"),
            aircraft_damage=r.get("Aircraft.Damage"),
            aircraft_category=r.get("Aircraft.Category"),
            make=r.get("Make"),
            model=r.get("Model"),
            total_fatal_injuries=to_int(r.get("Total.Fatal.Injuries")),
        )

        db.merge(acc)

db.commit()
db.close()
