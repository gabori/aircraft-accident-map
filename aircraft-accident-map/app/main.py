from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import router
from .data_loader import load_data

app = FastAPI(title="Aircraft Accident API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    load_data()

app.include_router(router)
