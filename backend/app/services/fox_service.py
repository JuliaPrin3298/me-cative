from sqlalchemy.orm import Session

from app.models.fox import Fox


def alimentar_raposa(db: Session, raposa: Fox) -> Fox:
    raposa.fome = min(100, raposa.fome + 20)
    raposa.humor = min(100, raposa.humor + 5)
    raposa.vinculo += 2

    db.commit()
    db.refresh(raposa)

    return raposa

def pentear_raposa(db: Session, raposa: Fox) -> Fox:
    raposa.humor = min(100, raposa.humor + 10)
    raposa.vinculo += 2

    db.commit()
    db.refresh(raposa)

    return raposa

def colocar_raposa_para_dormir(
    db: Session,
    raposa: Fox,
    minutos: int,
) -> Fox:
    raposa.energia = min(100, raposa.energia + (10 * minutos))
    raposa.fome = max(0, raposa.fome - (2 * minutos))
    raposa.humor = max(0, raposa.humor - (1 * minutos))

    db.commit()
    db.refresh(raposa)

    return raposa