import datetime
import enum
from database import Base
from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, Integer, String, null
from sqlalchemy.orm import relationship

class UserType(enum.Enum):
    admin = enum.auto()
    editor = enum.auto()
    standard = enum.auto()
    
class NewsType(enum.Enum):
    culture = enum.auto()
    general = enum.auto()
    lifestyle = enum.auto()
    science = enum.auto()
    sport = enum.auto()
    
class User(Base):
    __tablename__ = "user"

    sysuser = Column(Integer, primary_key = True, autoincrement = True)
    username = Column(String, unique = True)
    email = Column(String, unique = True,)
    password = Column(String)
    name = Column(String)
    surname = Column(String)
    type = Column(Enum(UserType), default = UserType.standard)
    create_date = Column(DateTime, default = datetime.datetime.utcnow)
    is_active = Column(Boolean, default = True)
    
    news = relationship("News", back_populates = "user")
    comments = relationship("Comment", back_populates = "user")

class News(Base):
    __tablename__ = "news"
    
    sysnews = Column(Integer, primary_key = True, autoincrement = True)
    title = Column(String)
    text = Column(String)
    type = Column(Enum(NewsType), default = NewsType.general)
    create_user = Column(Integer, ForeignKey("user.sysuser"))
    update_user = Column(Integer, ForeignKey("user.sysuser"))
    create_date = Column(DateTime, default = datetime.datetime.utcnow)
    update_date = Column(DateTime, default = null)
    is_active = Column(Boolean, default = True)
    
    user = relationship("User", back_populates = "news")
    comments = relationship("Comment", back_populates = "news")

class Comment(Base):
    __tablename__ = "comment"
    
    syscomment = Column(Integer, primary_key = True, autoincrement = True)
    text = Column(String)
    create_date = Column(DateTime, default = datetime.datetime.utcnow)
    update_date = Column(DateTime, default = null)
    is_active = Column(Boolean, default = True)
    sysuser = Column(Integer, ForeignKey("user.sysuser"))
    sysnews = Column(Integer, ForeignKey("news.sysnews"))
    
    user = relationship("User", back_populates = "comments")
    news = relationship("News", back_populates = "comments")
