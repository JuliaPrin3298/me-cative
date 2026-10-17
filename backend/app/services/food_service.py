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

from app.database.connection import SessionLocal
from app.models.food import Food

db = SessionLocal()

comida = db.query(Food).filter(Food.nome == "Maçã").first()

print(comida.id if comida else "Maçã não encontrada")
print(comida.nome if comida else "")
print(comida.preco if comida else "")

db.close()

def comprar_comida(
    db: Session,
    usuario_id: int,
    food_id: int,
) -> Inventory:
    comida = (
        db.query(Food)
        .filter(Food.id == food_id)
        .first()
    )

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
        raise ValueError("Estrelas insuficientes.")

    inventario = (
        db.query(Inventory)
        .filter(
            Inventory.usuario_id == usuario_id,
            Inventory.food_id == food_id,
        )
        .first()
    )

    if inventario:
        inventario.quantidade += 1
    else:
        inventario = Inventory(
            usuario_id=usuario_id,
            food_id=food_id,
            quantidade=1,
        )
        db.add(inventario)

    carteira.estrelas -= comida.preco

    db.commit()
    db.refresh(inventario)

    return inventario