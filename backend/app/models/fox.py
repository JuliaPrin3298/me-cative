from __future__ import annotations

from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Fox(Base):
    __tablename__ = "foxes"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    usuario_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        unique=True,
        nullable=False,
    )

    usuario: Mapped["User"] = relationship(
    "User",
    back_populates="fox",
    )

    fome: Mapped[int] = mapped_column(
        Integer,
        default=100,
        nullable=False,
    )

    energia: Mapped[int] = mapped_column(
        Integer,
        default=100,
        nullable=False,
    )

    humor: Mapped[int] = mapped_column(
        Integer,
        default=100,
        nullable=False,
    )

    vinculo: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )