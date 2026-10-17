from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.fox import Fox
from app.services.fox_service import alimentar_raposa, pentear_raposa

router = APIRouter(
    prefix="/api/fox",
    tags=["Fox"],
)


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
    