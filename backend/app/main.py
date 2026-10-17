from fastapi import FastAPI

from app.database.base import Base
from app.database.connection import engine
from app.models.user import User
from app.models.fox import Fox
from app.models.food import Food
from app.models.inventory import Inventory
from app.routers.fox import router as fox_router

app = FastAPI(
    title="Me Cative API",
    version="0.1.0",
)

app.include_router(fox_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {
        "message": "Me Cative API funcionando!"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }