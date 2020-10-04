import bcrypt
from sqlalchemy import Column, Integer, String, Table
from libs.model_base import Base


users = Table(
    'users', Base.metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String, unique=True, nullable=False),
    Column('hash_code', String, nullable=False),
)


def generate_hash(code: str):
    return bcrypt.hashpw(code.encode(), bcrypt.gensalt()).decode()


def check_hash(hash_code: str, code: str):
    return bcrypt.checkpw(code.encode(), hash_code.encode())
