#region IMPORTS
import datetime
import enum
from database import Base
from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, Integer, String, null
from sqlalchemy.orm import relationship
#endregion
 
#region USER
class UserType(enum.Enum):
    admin = enum.auto()
    editor = enum.auto()
    standard = enum.auto()

class User(Base):
    __tablename__ = "user"

    sysuser = Column(Integer, primary_key = True, autoincrement = True)
    username = Column(String, unique = True, nullable = False)
    email = Column(String, unique = True, nullable = False)
    password = Column(String, nullable = False)
    name = Column(String)
    surname = Column(String)
    type = Column(Enum(UserType), default = UserType.standard)
    create_date = Column(DateTime, default = datetime.datetime.utcnow)
    is_active = Column(Boolean, default = True)
#endregion

#region NEWS
class NewsType(enum.Enum):
    culture = enum.auto()
    general = enum.auto()
    lifestyle = enum.auto()
    science = enum.auto()
    sport = enum.auto()

class News(Base):
    __tablename__ = "news"
    
    sysnews = Column(Integer, primary_key = True, autoincrement = True)
    title = Column(String, nullable = False)
    text = Column(String, nullable = False)
    type = Column(Enum(NewsType), default = NewsType.general)
    create_date = Column(DateTime, default = datetime.datetime.utcnow)
    update_date = Column(DateTime, default = null)
    is_active = Column(Boolean, default = True)
    create_sysuser = Column(Integer, ForeignKey("user.sysuser"), nullable = False)
    update_sysuser = Column(Integer, ForeignKey("user.sysuser"))
    
    create_user = relationship("User", foreign_keys=[create_sysuser])
    update_user = relationship("User", foreign_keys=[update_sysuser])
#endregion

#region COMMENT
class Comment(Base):
    __tablename__ = "comment"
    
    syscomment = Column(Integer, primary_key = True, autoincrement = True)
    text = Column(String, nullable = False)
    create_date = Column(DateTime, default = datetime.datetime.utcnow)
    update_date = Column(DateTime, default = null)
    is_active = Column(Boolean, default = True)
    sysuser = Column(Integer, ForeignKey("user.sysuser"), nullable = False)
    sysnews = Column(Integer, ForeignKey("news.sysnews"), nullable = False)
    
    user = relationship("User", foreign_keys=[sysuser])
    news = relationship("News", foreign_keys=[sysnews])
#endregion
