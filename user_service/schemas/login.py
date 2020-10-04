from pydantic import BaseModel

from .user import UserSchema


class LoginSchema(BaseModel):
    user: UserSchema
    token: str
