from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


# Raiz do projeto Me Cative
BASE_DIR = Path(__file__).resolve().parents[3]

# Pasta onde ficará o banco
DATABASE_DIR = BASE_DIR / "database"
DATABASE_DIR.mkdir(exist_ok=True)

# Arquivo SQLite
DATABASE_URL = f"sqlite:///{DATABASE_DIR / 'me_cative.db'}"


engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)