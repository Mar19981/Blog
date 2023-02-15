#region IMPORTS
from datetime import datetime
from models import UserType, NewsType
from pydantic import BaseModel
from typing import Optional
#endregion

#region USER
class UserBase(BaseModel):
    pass

class UserCreate(UserBase):
    username: str
    email: str
    password: str
    name: str
    surname: str
    
# class UserUpdate(UserBase):
#     username: str
#     email: str
#     password: str
#     name: str
#     surname: str
#     type: UserType
#     is_active: bool

class User(UserBase):
    sysuser: int
    username: str
    email: str
    password: str
    name: str
    surname: str
    type: UserType
    create_date: datetime
    is_active: bool

    class Config:
        orm_mode = True
#endregion

#region NEWS
class NewsBase(BaseModel):
    pass

class NewsCreate(NewsBase):
    title: str
    text: str
    type: NewsType
    create_sysuser: int
    
# class NewsUpdate(NewsBase):
#     title: str
#     text: str
#     type: NewsType
#     update_sysuser: int
#     update_date: datetime
#     is_active: bool

class News(NewsBase):
    sysnews: int
    title: str
    text: str
    type: NewsType
    create_date: datetime
    update_date: Optional[datetime] = None
    is_active: bool
    create_sysuser: int
    update_sysuser: Optional[int] = None

    class Config:
        orm_mode = True
#endregion

#region COMMENT
class CommentBase(BaseModel):
    pass

class CommentCreate(CommentBase):
    text: str
    sysuser: int
    sysnews: int
    
# class CommentUpdate(CommentBase):
#     text: str
#     is_active: bool

class Comment(CommentBase):
    syscomment: int
    text: str
    create_date: datetime
    update_date: Optional[datetime] = None
    is_active: bool
    sysuser: int
    sysnews: int

    class Config:
        orm_mode = True
#endregion
