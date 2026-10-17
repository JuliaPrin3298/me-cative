from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database.connection import SessionLocal
from app.models.fox import Fox
from app.services.fox_service import (
    alimentar_raposa,
    pentear_raposa,
    colocar_raposa_para_dormir,
)
router = APIRouter(
    prefix="/api/fox",
    tags=["Fox"],
)

class SleepRequest(BaseModel):
    minutos: int


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/feed")
def feed_fox(db: Session = Depends(get_db)):
    raposa = db.query(Fox).first()

    if not raposa:
        raise HTTPException(
            status_code=404,
            detail="Raposa não encontrada.",
        )

    raposa = alimentar_raposa(db, raposa)

    return {
        "id": raposa.id,
        "fome": raposa.fome,
        "energia": raposa.energia,
        "humor": raposa.humor,
        "vinculo": raposa.vinculo,
    }

@router.post("/groom")
def groom_fox(db: Session = Depends(get_db)):
    raposa = db.query(Fox).first()

    if not raposa:
        raise HTTPException(
            status_code=404,
            detail="Raposa não encontrada.",
        )

    raposa = pentear_raposa(db, raposa)

    return {
        "id": raposa.id,
        "fome": raposa.fome,
        "energia": raposa.energia,
        "humor": raposa.humor,
        "vinculo": raposa.vinculo,
    }

@router.post("/sleep")
def sleep_fox(
    dados: SleepRequest,
    db: Session = Depends(get_db),
):
    if dados.minutos <= 0:
        raise HTTPException(
            status_code=400,
            detail="O tempo de sono deve ser maior que zero.",
        )

    raposa = db.query(Fox).first()

    if not raposa:
        raise HTTPException(
            status_code=404,
            detail="Raposa não encontrada.",
        )

    raposa = colocar_raposa_para_dormir(
        db,
        raposa,
        dados.minutos,
    )

    return {
        "id": raposa.id,
        "minutos_dormidos": dados.minutos,
        "fome": raposa.fome,
        "energia": raposa.energia,
        "humor": raposa.humor,
        "vinculo": raposa.vinculo,
    }