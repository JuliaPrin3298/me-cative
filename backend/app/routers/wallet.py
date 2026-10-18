from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.services.wallet_service import obter_ou_criar_carteira


router = APIRouter(
    prefix="/api/wallet",
    tags=["Wallet"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("")
def get_wallet(db: Session = Depends(get_db)):
    carteira = obter_ou_criar_carteira(db, 1)

    return {
        "id": carteira.id,
        "usuario_id": carteira.usuario_id,
        "estrelas": carteira.estrelas,
    }