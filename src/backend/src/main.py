#region IMPORTS
import crud
import models
import schemas
from database import SessionLocal, engine
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
#endregion

models.Base.metadata.create_all(bind = engine)

app = FastAPI()

#region DEPENDENCY
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
#endregion

#region OPERATIONS
@app.get("/")
def read_root():
    return {"Hello": "WORLD !!!"}
#endregion

#region USER
@app.get("/users", response_model = list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    users = crud.get_users(db)
    if users is None:
        raise HTTPException(status_code = 404, detail = "Users not found!")
    return users

@app.get("/users/active", response_model = list[schemas.User])
def read_users_active(db: Session = Depends(get_db)):
    users = crud.get_users_active(db)
    if users is None:
        raise HTTPException(status_code = 404, detail = "Active Users not found!")
    return users

@app.get("/users/inactive", response_model = list[schemas.User])
def read_users_inactive(db: Session = Depends(get_db)):
    users = crud.get_users_inactive(db)
    if users is None:
        raise HTTPException(status_code = 404, detail = "Inactive Users not found!")
    return users

@app.get("/user/id={sysuser}", response_model = schemas.User)
def read_user_by_id(sysuser: int, db: Session = Depends(get_db)):
    user = crud.get_user_by_id(db, sysuser = sysuser)
    if user is None:
        raise HTTPException(status_code = 404, detail = "User not found!")
    return user

@app.get("/user/username={username}", response_model = schemas.User)
def read_user_by_username(username: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, username = username)
    if user is None:
        raise HTTPException(status_code = 404, detail = "User not found!")
    return user

@app.get("/user/email={email}", response_model = schemas.User)
def read_user_by_email(email: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email = email)
    if user is None:
        raise HTTPException(status_code = 404, detail = "User not found!")
    return user

# @app.get("/user/id={sysuser}/newses", response_model = list[schemas.News])
# def read_user_newses_by_id(sysuser: int, db: Session = Depends(get_db)):
#     newses = crud.get_user_newses_by_id(db, sysuser = sysuser)
#     if newses is None:
#         raise HTTPException(status_code = 404, detail = "User Newses not found!")
#     return newses

# @app.get("/user/id={sysuser}/newses/active", response_model = list[schemas.News])
# def read_user_newses_active_by_id(sysuser: int, db: Session = Depends(get_db)):
#     newses = crud.get_user_newses_active_by_id(db, sysuser = sysuser)
#     if newses is None:
#         raise HTTPException(status_code = 404, detail = "User Active Newses not found!")
#     return newses

# @app.get("/user/id={sysuser}/newses/inactive", response_model = list[schemas.News])
# def read_user_newses_inactive_by_id(sysuser: int, db: Session = Depends(get_db)):
#     newses = crud.get_user_newses_inactive_by_id(db, sysuser = sysuser)
#     if newses is None:
#         raise HTTPException(status_code = 404, detail = "User Inactive Newses not found!")
#     return newses

# @app.get("/user/id={sysuser}/comments", response_model = list[schemas.Comment])
# def read_user_comments_by_id(sysuser: int, db: Session = Depends(get_db)):
#     comments = crud.get_user_comments_by_id(db, sysuser = sysuser)
#     if comments is None:
#         raise HTTPException(status_code = 404, detail = "User Comments not found!")
#     return comments

# @app.get("/user/id={sysuser}/comments/active", response_model = list[schemas.Comment])
# def read_user_comments_active_by_id(sysuser: int, db: Session = Depends(get_db)):
#     comments = crud.get_user_comments_active_by_id(db, sysuser = sysuser)
#     if comments is None:
#         raise HTTPException(status_code = 404, detail = "User Active Comments not found!")
#     return comments

# @app.get("/user/id={sysuser}/comments/inactive", response_model = list[schemas.Comment])
# def read_user_comments_inactive_by_id(sysuser: int, db: Session = Depends(get_db)):
#     comments = crud.get_user_comments_inactive_by_id(db, sysuser = sysuser)
#     if comments is None:
#         raise HTTPException(status_code = 404, detail = "User Inactive Comments not found!")
#     return comments
#endregion

#region NEWS
@app.get("/newses", response_model = list[schemas.News])
def read_newses(db: Session = Depends(get_db)):
    newses = crud.get_newses(db)
    if newses is None:
        raise HTTPException(status_code = 404, detail = "Newses not found!")
    return newses

@app.get("/newses/active", response_model = list[schemas.News])
def read_newses_active(db: Session = Depends(get_db)):
    newses = crud.get_newses_active(db)
    if newses is None:
        raise HTTPException(status_code = 404, detail = "Active Newses not found!")
    return newses

@app.get("/newses/inactive", response_model = list[schemas.News])
def read_newses_inactive(db: Session = Depends(get_db)):
    newses = crud.get_newses_inactive(db)
    if newses is None:
        raise HTTPException(status_code = 404, detail = "Inactive Newses not found!")
    return newses

@app.get("/news/id={sysnews}", response_model = schemas.News)
def read_user_by_id(sysnews: int, db: Session = Depends(get_db)):
    news = crud.get_news_by_id(db, sysnews = sysnews)
    if news is None:
        raise HTTPException(status_code = 404, detail = "News not found!")
    return news

# @app.get("/news/id={sysnews}/comments", response_model = list[schemas.Comment])
# def read_news_comments_by_id(sysnews: int, db: Session = Depends(get_db)):
#     comments = crud.get_news_comments_by_id(db, sysnews = sysnews)
#     if comments is None:
#         raise HTTPException(status_code = 404, detail = "News Comments not found!")
#     return comments

# @app.get("/news/id={sysnews}/comments/active", response_model = list[schemas.Comment])
# def read_news_comments_active_by_id(sysnews: int, db: Session = Depends(get_db)):
#     comments = crud.get_news_comments_active_by_id(db, sysnews = sysnews)
#     if comments is None:
#         raise HTTPException(status_code = 404, detail = "News Active Comments not found!")
#     return comments

# @app.get("/news/id={sysnews}/comments/inactive", response_model = list[schemas.Comment])
# def read_news_comments_inactive_by_id(sysnews: int, db: Session = Depends(get_db)):
#     comments = crud.get_news_comments_inactive_by_id(db, sysnews = sysnews)
#     if comments is None:
#         raise HTTPException(status_code = 404, detail = "News Inactive Comments not found!")
#     return comments

# @app.get("/news/id={sysnews}/create_user", response_model = schemas.User)
# def read_news_create_user_by_id(sysnews: int, db: Session = Depends(get_db)):
#     user = crud.get_news_create_user_by_id(db, sysnews = sysnews)
#     if user is None:
#         raise HTTPException(status_code = 404, detail = "News Create User not found!")
#     return user

# @app.get("/news/id={sysnews}/update_user", response_model = schemas.User)
# def read_news_update_user_by_id(sysnews: int, db: Session = Depends(get_db)):
#     user = crud.get_news_update_user_by_id(db, sysnews = sysnews)
#     if user is None:
#         raise HTTPException(status_code = 404, detail = "News Update User not found!")
#     return user
#endregion

#region COMMENT
@app.get("/comments", response_model = list[schemas.Comment])
def read_comments(db: Session = Depends(get_db)):
    comments = crud.get_comments(db)
    if comments is None:
        raise HTTPException(status_code = 404, detail = "Comments not found!")
    return comments

@app.get("/comments/active", response_model = list[schemas.Comment])
def read_comments_active(db: Session = Depends(get_db)):
    comments = crud.get_comments_active(db)
    if comments is None:
        raise HTTPException(status_code = 404, detail = "Active Comments not found!")
    return comments

@app.get("/comments/inactive", response_model = list[schemas.Comment])
def read_comments_inactive(db: Session = Depends(get_db)):
    comments = crud.get_comments_inactive(db)
    if comments is None:
        raise HTTPException(status_code = 404, detail = "Inactive Comments not found!")
    return comments

@app.get("/comment/id={syscomment}", response_model = schemas.Comment)
def read_comment_by_id(syscomment: int, db: Session = Depends(get_db)):
    comment = crud.get_comment_by_id(db, syscomment = syscomment)
    if comment is None:
        raise HTTPException(status_code = 404, detail = "Comment not found!")
    return comment

# @app.get("/comment/id={syscomment}/user", response_model = schemas.User)
# def read_comment_user_by_id(syscomment: int, db: Session = Depends(get_db)):
#     user = crud.get_comment_user_by_id(db, syscomment = syscomment)
#     if user is None:
#         raise HTTPException(status_code = 404, detail = "Comment User not found!")
#     return user

# @app.get("/comment/id={syscomment}/news", response_model = schemas.News)
# def read_comment_news_by_id(syscomment: int, db: Session = Depends(get_db)):
#     news = crud.get_comment_news_by_id(db, syscomment = syscomment)
#     if news is None:
#         raise HTTPException(status_code = 404, detail = "Comment News not found!")
#     return news
#endregion
