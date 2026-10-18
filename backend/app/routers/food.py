from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.services.food_service import comprar_comida
from app.models.inventory import Inventory

router = APIRouter(
    prefix="/api/foods",
    tags=["Foods"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


class BuyFoodRequest(BaseModel):
    food_id: int


@router.post("/buy")
def buy_food(
    request: BuyFoodRequest,
    db: Session = Depends(get_db),
):
    try:
        inventario = comprar_comida(
            db,
            usuario_id=1,
            food_id=request.food_id,
        )

        return {
            "message": "Comida comprada com sucesso.",
            "inventario_id": inventario.id,
            "usuario_id": inventario.usuario_id,
            "food_id": inventario.food_id,
            "quantidade": inventario.quantidade,
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )
        
@router.get("/inventory")
def get_inventory(
    db: Session = Depends(get_db),
):
    inventarios = (
        db.query(Inventory)
        .filter(Inventory.usuario_id == 1)
        .all()
    )

    return [
        {
            "food_id": inventario.food.id,
            "nome": inventario.food.nome,
            "preco": inventario.food.preco,
            "quantidade": inventario.quantidade,
        }
        for inventario in inventarios
    ]
