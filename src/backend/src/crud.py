import models
# import schemas
from sqlalchemy.orm import Session

def get_users(db: Session):
    return db.query(models.User).all()

# def get_user_by_id(db: Session, sysid: int):
#     return db.query(models.User).filter(models.User.sysuser == sysid).first()

# def get_user_by_username(db: Session, username: str):
#     return db.query(models.User).filter(models.User.username == username).first()

# def get_user_by_email(db: Session, email: str):
#     return db.query(models.User).filter(models.User.email == email).first()

# def get_user_sysuser_by_username(db: Session, username: str):
#     return db.query(models.User.sysuser).filter(models.User.username == username).first()

# def get_user_sysuser_by_email(db: Session, email: str):
#     return db.query(models.User.sysuser).filter(models.User.email == email).first()

# def get_user_username_by_id(db: Session, sysid: int):
#     return db.query(models.User.username).filter(models.User.sysuser == sysid).first()

# def get_user_email_by_id(db: Session, sysid: int):
#     return db.query(models.User.email).filter(models.User.sysuser == sysid).first()

# def get_user_password_by_id(db: Session, sysid: int):
#     return db.query(models.User.password).filter(models.User.sysuser == sysid).first()

# def get_user_name_by_id(db: Session, sysid: int):
#     return db.query(models.User.name).filter(models.User.sysuser == sysid).first()

# def get_user_surname_by_id(db: Session, sysid: int):
#     return db.query(models.User.surname).filter(models.User.sysuser == sysid).first()

# def get_user_type_by_id(db: Session, sysid: int):
#     return db.query(models.User.type).filter(models.User.sysuser == sysid).first()

# def get_user_is_active_by_id(db: Session, sysid: int):
#     return db.query(models.User.is_active).filter(models.User.sysuser == sysid).first()

# def create_user(db: Session, user: schemas.UserCreate):
#     db_user = models.User(user)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user
