from . import data_loader


def get_accidents_by_year(year: int):
    if data_loader.df is None:
        raise RuntimeError("Data not loaded")

    subset = data_loader.df[data_loader.df["year"] == year]
    return subset[
        [
            "Event.Id",
            "Event.Date",
            "Latitude",
            "Longitude",
            "Location",
            "Injury.Severity",
        ]
    ].to_dict(orient="records")


def get_stats_by_year(year: int):
    if data_loader.df is None:
        raise RuntimeError("Data not loaded")

    subset = data_loader.df[data_loader.df["year"] == year]

    fatal = (
        subset["Injury.Severity"]
        .astype(str)
        .str.contains("Fatal", na=False)
        .sum()
    )

    return {
        "year": year,
        "total_accidents": int(len(subset)),
        "fatal_accidents": int(fatal),
    }
