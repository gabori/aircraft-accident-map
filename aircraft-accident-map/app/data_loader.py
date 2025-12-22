import pandas as pd

df = None

def load_data():
    global df
    df = pd.read_csv("app/data/aviation_accidents.csv", encoding="latin1")
    df = df.dropna(subset=["Latitude", "Longitude"])
    df["Event.Date"] = pd.to_datetime(df["Event.Date"], errors="coerce")
    df["year"] = df["Event.Date"].dt.year
    df = df.where(pd.notnull(df), None)
