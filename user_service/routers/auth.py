from typing import Optional

from fastapi import APIRouter, Header, HTTPException

import jwt
from jwt import PyJWTError

from configs import config

router = APIRouter()


@router.get("/auth/", tags=["users"])
async def auth(authorization: Optional[str] = Header(...)):
    try:
        jwt.decode(authorization.encode(), key=config.JWT_SALT, algorithms=['HS512'])
    except PyJWTError as e:
        raise HTTPException(
            status_code=401,
        )
