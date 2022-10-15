from models import UserType
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    email: str
    password: str
    name: str
    surname: str
    type: UserType
    is_active: bool

class User(UserBase):
    sysuser: int
    email: str
    password: str
    name: str
    surname: str
    type: UserType
    is_active: bool

    class Config:
        orm_mode = True
