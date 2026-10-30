
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


def comprar_comida(
    db: Session,
    usuario_id: int,
    food_id: int,
) -> Inventory:
    try:
        comida = db.query(Food).filter(Food.id == food_id).first()

        if not comida:
            raise ValueError("Comida não encontrada.")

        carteira = (
            db.query(Wallet)
            .filter(Wallet.usuario_id == usuario_id)
            .first()
        )

        if not carteira:
            raise ValueError("Carteira não encontrada.")

        if carteira.estrelas < comida.preco:
            raise ValueError("Saldo insuficiente.")

        inventario = (
            db.query(Inventory)
            .filter(
                Inventory.usuario_id == usuario_id,
                Inventory.food_id == food_id,
            )
            .first()
        )

        carteira.estrelas -= comida.preco

        if inventario:
            inventario.quantidade += 1
        else:
            inventario = Inventory(
                usuario_id=usuario_id,
                food_id=food_id,
                quantidade=1,
            )
            db.add(inventario)

        db.commit()
        db.refresh(inventario)

        return inventario

    except Exception:
        db.rollback()
        raise
