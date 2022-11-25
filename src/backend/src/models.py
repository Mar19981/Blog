#region IMPORTS
import datetime
import enum
from database import Base
from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship
#endregion
 
#region USER
class UserType(enum.Enum):
    admin = enum.auto()
    editor = enum.auto()
    standard = enum.auto()

class User(Base):
    __tablename__ = "user"

    sysuser = Column(Integer, autoincrement = True, index = True, primary_key = True)
    username = Column(String, index = True, nullable = False, unique = True)
    email = Column(String, index = True, nullable = False, unique = True,)
    password = Column(String, nullable = False)
    name = Column(String, nullable = False)
    surname = Column(String, nullable = False)
    type = Column(Enum(UserType), default = UserType.standard, nullable = False)
    create_date = Column(DateTime, default = datetime.datetime.utcnow, nullable = False)
    is_active = Column(Boolean, default = True, nullable = False)
    
    __table_args__ = (
        UniqueConstraint('username', 'email', name='_username_email_uc'),
    )
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
    
    sysnews = Column(Integer, autoincrement = True, index = True, primary_key = True)
    title = Column(String, nullable = False, index = True)
    text = Column(String, nullable = False, index = True)
    type = Column(Enum(NewsType), default = NewsType.general, nullable = False)
    create_date = Column(DateTime, default = datetime.datetime.utcnow, nullable = False)
    update_date = Column(DateTime, default = None)
    is_active = Column(Boolean, default = True, nullable = False)
    create_sysuser = Column(Integer, ForeignKey("user.sysuser"), nullable = False)
    update_sysuser = Column(Integer, ForeignKey("user.sysuser"))
    
    create_user = relationship("User", foreign_keys=[create_sysuser])
    update_user = relationship("User", foreign_keys=[update_sysuser])
#endregion

#region COMMENT
class Comment(Base):
    __tablename__ = "comment"
    
    syscomment = Column(Integer, autoincrement = True, index = True, primary_key = True)
    text = Column(String, index = True, nullable = False)
    create_date = Column(DateTime, default = datetime.datetime.utcnow, nullable = False)
    update_date = Column(DateTime, default = None)
    is_active = Column(Boolean, default = True, nullable = False)
    sysuser = Column(Integer, ForeignKey("user.sysuser"), nullable = False)
    sysnews = Column(Integer, ForeignKey("news.sysnews"), nullable = False)
    
    user = relationship("User", foreign_keys=[sysuser])
    news = relationship("News", foreign_keys=[sysnews])
#endregion
