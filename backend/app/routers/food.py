
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.food import Food
from app.models.inventory import Inventory
from app.models.wallet import Wallet
from app.services.food_service import comprar_comida as executar_compra
from app.models.food import Food


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


@router.get("/")
def listar_comidas(db: Session = Depends(get_db)):
    comidas = db.query(Food).order_by(Food.id).all()
    comidas = db.query(Food).all()

    return [
        {
            "id": comida.id,
            "nome": comida.nome,
            "preco": comida.preco,
        }
        for comida in comidas
    ]

@router.post("/buy")
def comprar_comida(
    request: BuyFoodRequest,
    db: Session = Depends(get_db),
):
    try:
        inventario = executar_compra(
            db,
            usuario_id=1,
            food_id=request.food_id,
        )

        carteira = (
            db.query(Wallet)
            .filter(Wallet.usuario_id == inventario.usuario_id)
            .first()
        )

        if not carteira:
            raise HTTPException(
                status_code=404,
                detail="Carteira não encontrada.",
            )

        return {
            "message": "Comida comprada com sucesso.",
            "inventario_id": inventario.id,
            "usuario_id": inventario.usuario_id,
            "food_id": inventario.food_id,
            "quantidade": inventario.quantidade,
            "estrelas": carteira.estrelas,
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )


@router.get("/inventory")
def get_inventory(db: Session = Depends(get_db)):
    inventarios = (
        db.query(Inventory)
        .filter(Inventory.usuario_id == 1)
        .all()
    )

    return [
        {
            "food_id": item.food.id,
            "nome": item.food.nome,
            "preco": item.food.preco,
            "quantidade": item.quantidade,
        }
        for item in inventarios
    ]
