#region IMPORTS
from fastapi import HTTPException
import models
import schemas
# import schemas
from sqlalchemy.orm import Session
#endregion

#region USER
def get_users(db: Session) -> list[schemas.User]:
    return db.query(models.User).all()

def get_users_active(db: Session) -> list[schemas.User]:
    return db.query(models.User).filter(models.User.is_active == True).all()

def get_users_inactive(db: Session) -> list[schemas.User]:
    return db.query(models.User).filter(models.User.is_active == False).all()

def create_user(db: Session, user: schemas.UserCreate) -> bool:
    db_user = models.User()
    
    db_user.username = user.username
    db_user.email = user.email
    db_user.password = user.password
    db_user.name = user.name
    db_user.surname = user.surname
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return True

def delete_user(db: Session, user: schemas.User) -> bool:
    user.is_active = False
    db.commit()
    return True

def get_user_by_id(db: Session, sysuser: int) -> schemas.User:
    return db.query(models.User).filter(models.User.sysuser == sysuser).first()

def get_user_by_username(db: Session, username: str) -> schemas.User:
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str) -> schemas.User:
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_newses_by_id(db: Session, sysuser: int) -> list[schemas.News]:
    return db.query(models.News).join(models.User, models.News.create_sysuser == models.User.sysuser).filter(models.User.sysuser == sysuser).all()

def get_user_newses_active_by_id(db: Session, sysuser: int) -> list[schemas.News]:
    return db.query(models.News).join(models.User, models.News.create_sysuser == models.User.sysuser).filter(models.User.sysuser == sysuser).filter(models.News.is_active == True).all()

def get_user_newses_inactive_by_id(db: Session, sysuser: int) -> list[schemas.News]:
    return db.query(models.News).join(models.User, models.News.create_sysuser == models.User.sysuser).filter(models.User.sysuser == sysuser).filter(models.News.is_active == False).all()

def get_user_comments_by_id(db: Session, sysuser: int) -> list[schemas.Comment]:
    return db.query(models.Comment).join(models.User, models.Comment.sysuser == models.User.sysuser).filter(models.User.sysuser == sysuser).all()

def get_user_comments_active_by_id(db: Session, sysuser: int) -> list[schemas.Comment]:
    return db.query(models.Comment).join(models.User, models.Comment.sysuser == models.User.sysuser).filter(models.User.sysuser == sysuser).filter(models.Comment.is_active == True).all()

def get_user_comments_inactive_by_id(db: Session, sysuser: int) -> list[schemas.Comment]:
    return db.query(models.Comment).join(models.User, models.Comment.sysuser == models.User.sysuser).filter(models.User.sysuser == sysuser).filter(models.Comment.is_active == False).all()
# #endregion

# #region NEWS
def get_newses(db: Session) -> list[schemas.News]:
    return db.query(models.News).all()

def get_newses_active(db: Session) -> list[schemas.News]:
    return db.query(models.News).filter(models.News.is_active == True).all()

def get_newses_inactive(db: Session) -> list[schemas.News]:
    return db.query(models.News).filter(models.News.is_active == False).all()

def create_news(db: Session, news: schemas.NewsCreate) -> bool:
    db_news = models.News()
    
    db_news.title = news.title
    db_news.text = news.text
    db_news.type = news.type
    db_news.create_sysuser = news.create_sysuser
    
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    return True

def delete_news(db: Session, news: schemas.News) -> bool:
    news.is_active = False
    db.commit()
    return True

def get_news_by_id(db: Session, sysnews: int) -> schemas.News:
    return db.query(models.News).filter(models.News.sysnews == sysnews).first()

def get_news_comments_by_id(db: Session, sysnews: int) -> list[schemas.Comment]:
    return db.query(models.Comment).join(models.News, models.Comment.sysnews == models.News.sysnews).filter(models.News.sysnews == sysnews).all()

def get_news_comments_active_by_id(db: Session, sysnews: int) -> list[schemas.Comment]:
    return db.query(models.Comment).join(models.News, models.Comment.sysnews == models.News.sysnews).filter(models.News.sysnews == sysnews).filter(models.Comment.is_active == True).all()

def get_news_comments_inactive_by_id(db: Session, sysnews: int) -> list[schemas.Comment]:
    return db.query(models.Comment).join(models.News, models.Comment.sysnews == models.News.sysnews).filter(models.News.sysnews == sysnews).filter(models.Comment.is_active == False).all()

def get_news_create_user_by_id(db: Session, sysnews: int) -> schemas.User:
    return db.query(models.User).join(models.News, models.User.sysuser == models.News.create_sysuser).filter(models.News.sysnews == sysnews).first()

def get_news_update_user_by_id(db: Session, sysnews: int) -> schemas.User:
    return db.query(models.User).join(models.News, models.User.sysuser == models.News.update_sysuser).filter(models.News.sysnews == sysnews).first()
# #endregion

# #region COMMENT
def get_comments(db: Session) -> list[schemas.Comment]:
    return db.query(models.Comment).all()

def get_comments_active(db: Session) -> list[schemas.Comment]:
    return db.query(models.Comment).filter(models.Comment.is_active == True).all()

def get_comments_inactive(db: Session) -> list[schemas.Comment]:
    return db.query(models.Comment).filter(models.Comment.is_active == False).all()

def create_comment(db: Session, comment: schemas.CommentCreate) -> bool:
    db_comment = models.Comment()
    
    db_comment.text = comment.text
    db_comment.sysuser = comment.sysuser
    db_comment.sysnews = comment.sysnews
    
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return True

def delete_comment(db: Session, comment: schemas.Comment) -> bool:
    comment.is_active = False
    db.commit()
    return True

def get_comment_by_id(db: Session, syscomment: int) -> schemas.Comment:
    return db.query(models.Comment).filter(models.Comment.syscomment == syscomment).first()

def get_comment_user_by_id(db: Session, syscomment: int) -> schemas.User:
    return db.query(models.User).join(models.Comment, models.User.sysuser == models.Comment.sysuser).filter(models.Comment.syscomment == syscomment).first()

def get_comment_news_by_id(db: Session, syscomment: int) -> schemas.News:
    return db.query(models.News).join(models.Comment, models.News.sysnews == models.Comment.sysnews).filter(models.Comment.syscomment == syscomment).first()
#endregion

# def create_user(db: Session, user: schemas.UserCreate):
#     db_user = models.User(user)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user
