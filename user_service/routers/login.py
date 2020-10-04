from datetime import datetime, timedelta

from fastapi import APIRouter, Body, HTTPException
import jwt

from configs import config

from models import users

from libs.database import database
from models.user import check_hash

from schemas import UserSchema, LoginSchema

router = APIRouter()


@router.post("/login/", response_model=LoginSchema)
async def login(
    name: str = Body(...),
    password: str = Body(...),
):
    async with database.transaction():
        query = users.select().where(users.c.name == name)
        user = await database.fetch_one(query)

        if not user:
            raise HTTPException(
                status_code=404,
                detail=f"User with name: '{name}' not found",
            )

        if not check_hash(hash_code=user['hash_code'], code=password):
            raise HTTPException(
                status_code=403,
                detail=f"Incorrect username or password",
            )

        token = jwt.encode({
            'id': user['id'],
            'exp': datetime.utcnow() + timedelta(seconds=int(config.JWT_EXPIRE))
        }, config.JWT_SALT, algorithm='HS512')

        return LoginSchema(
            user=UserSchema(
                id=user['id'],
                name=user['name'],
            ),
            token=token
        )
