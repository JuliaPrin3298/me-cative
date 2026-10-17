from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Food(Base):
    __tablename__ = "foods"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    nome: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    preco: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )