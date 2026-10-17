from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.connection import engine
from app.models.user import User
from app.models.fox import Fox
from app.models.food import Food
from app.models.wallet import Wallet
from app.models.inventory import Inventory
from app.routers.fox import router as fox_router
from app.routers.wallet import router as wallet_router
from app.routers.food import router as food_router

app = FastAPI(
    title="Me Cative API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fox_router)
app.include_router(wallet_router)
app.include_router(food_router)

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