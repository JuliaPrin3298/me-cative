from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Inventory(Base):
    __tablename__ = "inventories"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    usuario_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    food_id: Mapped[int] = mapped_column(
        ForeignKey("foods.id"),
        nullable=False,
    )

    quantidade: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    usuario: Mapped["User"] = relationship(
        "User",
    )

    food: Mapped["Food"] = relationship(
        "Food",
    )