
from app.database.connection import SessionLocal, engine
from app.database.base import Base
from app.models.user import User
from app.models.fox import Fox
from app.models.wallet import Wallet
from app.models.food import Food
from app.models.inventory import Inventory


def inicializar_banco():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        usuario = (
            db.query(User)
            .filter(User.username == "jogador")
            .first()
        )

        if not usuario:
            usuario = User(
                username="jogador",
                email="jogador@me-cative.local",
            )
            db.add(usuario)
            db.flush()

        raposa = (
            db.query(Fox)
            .filter(Fox.usuario_id == usuario.id)
            .first()
        )

        if not raposa:
            raposa = Fox(usuario_id=usuario.id)
            db.add(raposa)

        carteira = (
            db.query(Wallet)
            .filter(Wallet.usuario_id == usuario.id)
            .first()
        )

        if not carteira:
            carteira = Wallet(usuario_id=usuario.id)
            db.add(carteira)

        produtos = [
            ("Morango", 10),
            ("Pão Estrela", 20),
            ("Biscoito Lua", 25),
            ("Amora", 12),
            ("Carne", 30),
            ("Coxa de Frango", 28),
            ("Fruta Mistério", 80),
            ("Linguiça", 25),
            ("Mirtilos", 15),
            ("Peixe Assado", 32),
            ("Sopa", 26),
            ("Suco de Laranja", 17),
            ("Suco de Uva", 16),
        ]

        for nome, preco in produtos:
            comida = (
                db.query(Food)
                .filter(Food.nome == nome)
                .first()
            )

            if comida is None:
                db.add(Food(nome=nome, preco=preco))
            else:
                comida.preco = preco

        db.commit()

        db.refresh(usuario)
        db.refresh(raposa)
        db.refresh(carteira)

        print("Banco inicializado!")
        print(f"Usuário ID: {usuario.id}")
        print(f"Raposa ID: {raposa.id}")
        print(f"Carteira ID: {carteira.id}")
        print(f"Produtos cadastrados: {db.query(Food).count()}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    inicializar_banco()
