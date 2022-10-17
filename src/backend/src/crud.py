#region IMPORTS
import models
# import schemas
from sqlalchemy.orm import Session
#endregion

#region USER
def get_users(db: Session):
    return db.query(models.User).all()

def get_users_active(db: Session):
    return db.query(models.User).filter(models.User.is_active == True).all()

def get_users_inactive(db: Session):
    return db.query(models.User).filter(models.User.is_active == False).all()

def get_user_by_id(db: Session, sysuser: int):
    return db.query(models.User).filter(models.User.sysuser == sysuser).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

# def get_user_sysuser_by_username(db: Session, username: str):
#     return db.query(models.User.sysuser).filter(models.User.username == username).first()

# def get_user_sysuser_by_email(db: Session, email: str):
#     return db.query(models.User.sysuser).filter(models.User.email == email).first()

# def get_user_username_by_id(db: Session, sysuser: int):
#     return db.query(models.User.username).filter(models.User.sysuser == sysuser).first()

# def get_user_username_by_email(db: Session, email: str):
#     return db.query(models.User.username).filter(models.User.email == email).first()

# def get_user_email_by_id(db: Session, sysuser: int):
#     return db.query(models.User.email).filter(models.User.sysuser == sysuser).first()

# def get_user_email_by_username(db: Session, username: str):
#     return db.query(models.User.email).filter(models.User.username == username).first()

# def get_user_password_by_id(db: Session, sysuser: int):
#     return db.query(models.User.password).filter(models.User.sysuser == sysuser).first()

# def get_user_password_by_username(db: Session, username: str):
#     return db.query(models.User.password).filter(models.User.username == username).first()

# def get_user_password_by_email(db: Session, email: str):
#     return db.query(models.User.password).filter(models.User.email == email).first()

# def get_user_name_by_id(db: Session, sysuser: int):
#     return db.query(models.User.name).filter(models.User.sysuser == sysuser).first()

# def get_user_name_by_username(db: Session, username: str):
#     return db.query(models.User.name).filter(models.User.username == username).first()

# def get_user_name_by_email(db: Session, email: str):
#     return db.query(models.User.name).filter(models.User.email == email).first()

# def get_user_surname_by_id(db: Session, sysuser: int):
#     return db.query(models.User.surname).filter(models.User.sysuser == sysuser).first()

# def get_user_surname_by_username(db: Session, username: str):
#     return db.query(models.User.surname).filter(models.User.username == username).first()

# def get_user_surname_by_email(db: Session, email: str):
#     return db.query(models.User.surname).filter(models.User.email == email).first()

# def get_user_type_by_id(db: Session, sysuser: int):
#     return db.query(models.User.type).filter(models.User.sysuser == sysuser).first()

# def get_user_type_by_username(db: Session, username: str):
#     return db.query(models.User.type).filter(models.User.username == username).first()

# def get_user_type_by_email(db: Session, email: str):
#     return db.query(models.User.type).filter(models.User.email == email).first()

# def get_user_create_date_by_id(db: Session, sysuser: int):
#     return db.query(models.User.create_date).filter(models.User.sysuser == sysuser).first()

# def get_user_create_date_by_username(db: Session, username: str):
#     return db.query(models.User.create_date).filter(models.User.username == username).first()

# def get_user_create_date_by_email(db: Session, email: str):
#     return db.query(models.User.create_date).filter(models.User.email == email).first()

# def get_user_is_active_by_id(db: Session, sysuser: int):
#     return db.query(models.User.is_active).filter(models.User.sysuser == sysuser).first()

# def get_user_is_active_by_username(db: Session, username: str):
#     return db.query(models.User.is_active).filter(models.User.username == username).first()

# def get_user_is_active_by_email(db: Session, email: str):
#     return db.query(models.User.is_active).filter(models.User.email == email).first()

# def get_user_newses_by_id(db: Session, sysuser: int):
#     return db.query(models.News).join(models.User, models.News.create_sysuser == models.User.sysuser).filter(models.User.sysuser == sysuser).all()

# def get_user_newses_active_by_id(db: Session, sysuser: int):
#     return db.query(models.User).join(models.News).filter(models.User.sysuser == sysuser).filter(models.News.is_active == True).all()

# def get_user_newses_inactive_by_id(db: Session, sysuser: int):
#     return db.query(models.User).join(models.News).filter(models.User.sysuser == sysuser).filter(models.News.is_active == False).all()
# #endregion

# #region NEWS
def get_newses(db: Session):
    return db.query(models.News).all()

def get_newses_active(db: Session):
    return db.query(models.News).filter(models.News.is_active == True).all()

def get_newses_inactive(db: Session):
    return db.query(models.News).filter(models.News.is_active == False).all()

def get_news_by_id(db: Session, sysnews: int):
    return db.query(models.News).filter(models.News.sysnews == sysnews).first()

# def get_news_title_by_id(db: Session, sysid: int):
#     return db.query(models.News.title).filter(models.News.sysnews == sysid).first()

# def get_news_text_by_id(db: Session, sysid: int):
#     return db.query(models.News.text).filter(models.News.sysnews == sysid).first()

# def get_news_type_by_id(db: Session, sysid: int):
#     return db.query(models.News.type).filter(models.News.sysnews == sysid).first()

# def get_news_create_sysuser_by_id(db: Session, sysid: int):
#     return db.query(models.News.create_sysuser).filter(models.News.sysnews == sysid).first()

# def get_news_create_date_by_id(db: Session, sysid: int):
#     return db.query(models.News.create_date).filter(models.News.sysnews == sysid).first()

# def get_news_update_sysuser_by_id(db: Session, sysid: int):
#     return db.query(models.News.update_sysuser).filter(models.News.sysnews == sysid).first()

# def get_news_update_date_by_id(db: Session, sysid: int):
#     return db.query(models.News.update_date).filter(models.News.sysnews == sysid).first()

# def get_news_is_active_by_id(db: Session, sysid: int):
#     return db.query(models.News.is_active).filter(models.News.sysnews == sysid).first()
# #endregion

# #region COMMENT
def get_comments(db: Session):
    return db.query(models.Comment).all()

def get_comments_active(db: Session):
    return db.query(models.Comment).filter(models.Comment.is_active == True).all()

def get_comments_inactive(db: Session):
    return db.query(models.Comment).filter(models.Comment.is_active == False).all()

def get_comment_by_id(db: Session, syscomment: int):
    return db.query(models.Comment).filter(models.Comment.syscomment == syscomment).first()

# def get_comment_text_by_id(db: Session, sysid: int):
#     return db.query(models.Comment.text).filter(models.Comment.syscomment == sysid).first()

# def get_comment_create_date_by_id(db: Session, sysid: int):
#     return db.query(models.Comment.create_date).filter(models.Comment.syscomment == sysid).first()

# def get_comment_update_date_by_id(db: Session, sysid: int):
#     return db.query(models.Comment.update_date).filter(models.Comment.syscomment == sysid).first()

# def get_comment_is_active_by_id(db: Session, sysid: int):
#     return db.query(models.Comment.is_active).filter(models.Comment.syscomment == sysid).first()

# def get_comment_sysuser_by_id(db: Session, sysid: int):
#     return db.query(models.Comment.sysuser).filter(models.Comment.syscomment == sysid).first()

# def get_comment_sysnews_by_id(db: Session, sysid: int):
#     return db.query(models.Comment.sysnews).filter(models.Comment.syscomment == sysid).first()
#endregion

# def create_user(db: Session, user: schemas.UserCreate):
#     db_user = models.User(user)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user
