from sqlalchemy.orm import Session

from app.models.wallet import Wallet


def obter_ou_criar_carteira(
    db: Session,
    usuario_id: int,
) -> Wallet:
    carteira = (
        db.query(Wallet)
        .filter(Wallet.usuario_id == usuario_id)
        .first()
    )

    if carteira:
        return carteira

    carteira = Wallet(
        usuario_id=usuario_id,
        estrelas=100,
    )

    db.add(carteira)
    db.commit()
    db.refresh(carteira)

    return carteira

def gastar_estrelas(
    db: Session,
    carteira: Wallet,
    quantidade: int,
) -> Wallet:
    if quantidade <= 0:
        raise ValueError("A quantidade de estrelas deve ser maior que zero.")

    if carteira.estrelas < quantidade:
        raise ValueError("Estrelas insuficientes.")

    carteira.estrelas -= quantidade

    db.commit()
    db.refresh(carteira)

    return carteira