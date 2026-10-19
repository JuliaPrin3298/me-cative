
from sqlalchemy.orm import Session

from app.models.food import Food
from app.models.inventory import Inventory
from app.models.wallet import Wallet

def criar_comida(
    db: Session,
    nome: str,
    preco: int,
) -> Food:
    if preco <= 0:
        raise ValueError("O preço deve ser maior que zero.")

    comida = Food(
        nome=nome,
        preco=preco,
    )

    db.add(comida)
    db.commit()
    db.refresh(comida)

    return comida

@router.get("")
def listar_comidas(db: Session = Depends(get_db)):
    comidas = db.query(Food).order_by(Food.id).all()

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
        inventario = comprar_comida(
            db,
            usuario_id=1,
            food_id=request.food_id,
        )

        carteira = (
            db.query(Wallet)
            .filter(Wallet.usuario_id == 1)
            .first()
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

    try:
        db.commit()
        db.refresh(inventario)
    except Exception:
        db.rollback()
        raise

    return inventario
