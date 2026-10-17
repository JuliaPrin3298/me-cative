from fastapi import FastAPI

from app.database.base import Base
from app.database.connection import engine
from app.models.user import User
from app.models.fox import Fox

app = FastAPI(
    title="Me Cative API",
    version="0.1.0",
)

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