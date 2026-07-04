from sqlmodel import SQLModel, create_engine, Session
from config import DATABASE_URL, DB_ECHO

engine = create_engine(DATABASE_URL, echo=DB_ECHO, connect_args={"check_same_thread": False})

def create_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session