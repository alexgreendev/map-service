from pydantic import BaseModel


class UserSchema(BaseModel):
    id: int
    name: str
