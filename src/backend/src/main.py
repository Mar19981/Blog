#region IMPORTS
import json
import crud
import models
import schemas
import datetime
from database import SessionLocal, engine
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
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

#region USER
@app.get("/users", response_model = list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    db_users = crud.get_users(db)
    if db_users == []:
        raise HTTPException(status_code = 404, detail = "Users not found!")
    return db_users

@app.get("/users/active", response_model = list[schemas.User])
def read_users_active(db: Session = Depends(get_db)):
    db_users = crud.get_users_active(db)
    if db_users == []:
        raise HTTPException(status_code = 404, detail = "Users Active not found!")
    return db_users

@app.get("/users/inactive", response_model = list[schemas.User])
def read_users_inactive(db: Session = Depends(get_db)):
    db_users = crud.get_users_inactive(db)
    if db_users == []:
        raise HTTPException(status_code = 404, detail = "Users Inactive not found!")
    return db_users

@app.post("/user", response_model = bool)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered!")
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered!")
    return crud.post_user(db, user)

@app.put("/user/{sysuser}")
def update_user(sysuser: int, req: schemas.User, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, sysuser)
    if db_user:
        update_user_encoded = jsonable_encoder(req)
        db_user.name = update_user_encoded["name"]
        db_user.surname = update_user_encoded["surname"]
        db_user.email = update_user_encoded["email"]
        db_user.password = update_user_encoded["password"]
        match update_user_encoded["type"]:
            case 1:
                db_user.type = models.UserType.admin
            case 2:
                db_user.type = models.UserType.editor
            case 3:
                db_user.type = models.UserType.standard
        return crud.update_user(db, db_user)
    raise HTTPException(status_code=400, detail="Failed to update the user!")

@app.get("/user/{sysuser}", response_model = schemas.User)
def read_user_by_id(sysuser: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, sysuser)
    if db_user is None:
        raise HTTPException(status_code = 404, detail = "User not found!")
    return db_user

@app.delete("/user/{sysuser}", response_model = bool)
def delete_user_by_id(sysuser: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, sysuser)
    if db_user is None:
        raise HTTPException(status_code = 404, detail = "User not found!")
    return crud.delete_user(db, db_user)

@app.get("/user/username/{username}", response_model = schemas.User)
def read_user_by_username(username: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username)
    if db_user is None:
        raise HTTPException(status_code = 404, detail = "User not found!")
    return db_user

@app.get("/user/email/{email}", response_model = schemas.User)
def read_user_by_email(email: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email)
    if db_user is None:
        raise HTTPException(status_code = 404, detail = "User not found!")
    return db_user

@app.get("/user/{sysuser}/articles", response_model = list[schemas.News])
def read_user_newses_by_id(sysuser: int, db: Session = Depends(get_db)):
    db_newses = crud.get_user_newses_by_id(db, sysuser)
    if db_newses == []:
        raise HTTPException(status_code = 404, detail = "User Newses not found!")
    return db_newses

@app.delete("/user/{sysuser}/articles", response_model = bool)
def delete_user_newses_by_id(sysuser: int, db: Session = Depends(get_db)):
    db_newses = crud.get_user_newses_active_by_id(db, sysuser)
    if db_newses == []:
        raise HTTPException(status_code = 404, detail = "User Newses not found!")
    for db_news in db_newses:
        db_comments = crud.get_news_comments_active_by_id(db, db_news.sysnews)
        for db_comment in db_comments:
            crud.delete_comment(db, db_comment)
        crud.delete_news(db, db_news)
    return True

@app.get("/user/{sysuser}/articles/active", response_model = list[schemas.News])
def read_user_newses_active_by_id(sysuser: int, db: Session = Depends(get_db)):
    db_newses = crud.get_user_newses_active_by_id(db, sysuser)
    if db_newses == []:
        raise HTTPException(status_code = 404, detail = "User Newses Active not found!")
    return db_newses

@app.get("/user/{sysuser}/articles/inactive", response_model = list[schemas.News])
def read_user_newses_inactive_by_id(sysuser: int, db: Session = Depends(get_db)):
    db_newses = crud.get_user_newses_inactive_by_id(db, sysuser)
    if db_newses == []:
        raise HTTPException(status_code = 404, detail = "User Newses Inactive not found!")
    return db_newses

@app.get("/user/{sysuser}/comments", response_model = list[schemas.Comment])
def read_user_comments_by_id(sysuser: int, db: Session = Depends(get_db)):
    db_comments = crud.get_user_comments_by_id(db, sysuser)
    if db_comments == []:
        raise HTTPException(status_code = 404, detail = "User Comments not found!")
    return db_comments

@app.delete("/user/{sysuser}/comments", response_model = bool)
def delete_user_comments_by_id(sysuser: int, db: Session = Depends(get_db)):
    db_comments = crud.get_user_comments_active_by_id(db, sysuser)
    if db_comments == []:
        raise HTTPException(status_code = 404, detail = "User Comments not found!")
    for db_comment in db_comments:
        crud.delete_comment(db, db_comment)
    return True

@app.get("/user/{sysuser}/comments/active", response_model = list[schemas.Comment])
def read_user_comments_active_by_id(sysuser: int, db: Session = Depends(get_db)):
    db_comments = crud.get_user_comments_active_by_id(db, sysuser)
    if db_comments == []:
        raise HTTPException(status_code = 404, detail = "User Comments Active not found!")
    return db_comments

@app.get("/user/{sysuser}/comments/inactive", response_model = list[schemas.Comment])
def read_user_comments_inactive_by_id(sysuser: int, db: Session = Depends(get_db)):
    db_comments = crud.get_user_comments_inactive_by_id(db, sysuser)
    if db_comments == []:
        raise HTTPException(status_code = 404, detail = "User Comments Inactive not found!")
    return db_comments
#endregion

#region NEWS
@app.get("/articles", response_model = list[schemas.News])
def read_newses(db: Session = Depends(get_db)):
    db_newses = crud.get_newses(db)
    if db_newses == []:
        raise HTTPException(status_code = 404, detail = "Newses not found!")
    return db_newses

@app.get("/articles/active", response_model = list[schemas.News])
def read_newses_active(db: Session = Depends(get_db)):
    db_newses = crud.get_newses_active(db)
    if db_newses == []:
        raise HTTPException(status_code = 404, detail = "Newses Active not found!")
    return db_newses

@app.get("/articles/inactive", response_model = list[schemas.News])
def read_newses_inactive(db: Session = Depends(get_db)):
    db_newses = crud.get_newses_inactive(db)
    if db_newses == []:
        raise HTTPException(status_code = 404, detail = "Newses Inactive not found!")
    return db_newses

@app.post("/article", response_model = bool)
def create_news(news: schemas.NewsCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, news.create_sysuser)
    if db_user is None:
        raise HTTPException(status_code = 404, detail = "User not found!")
    return crud.post_news(db, news)

@app.get("/article/{sysnews}", response_model = schemas.News)
def read_news_by_id(sysnews: int, db: Session = Depends(get_db)):
    db_news = crud.get_news_by_id(db, sysnews)
    if db_news is None:
        raise HTTPException(status_code = 404, detail = "News not found!")
    return db_news

@app.delete("/article/{sysnews}", response_model = bool)
def delete_news_by_id(sysnews: int, db: Session = Depends(get_db)):
    db_news = crud.get_news_by_id(db, sysnews)
    if db_news is None:
        raise HTTPException(status_code = 404, detail = "News not found!")
    db_comments = crud.get_news_comments_active_by_id(db, db_news.sysnews)
    for db_comment in db_comments:
        crud.delete_comment(db, db_comment)
    return crud.delete_news(db, db_news)

@app.get("/article/{sysnews}/comments", response_model = list[schemas.Comment])
def read_news_comments_by_id(sysnews: int, db: Session = Depends(get_db)):
    db_comments = crud.get_news_comments_by_id(db, sysnews)
    if db_comments == []:
        raise HTTPException(status_code = 404, detail = "News Comments not found!")
    return db_comments

@app.delete("/article/{sysnews}/comments", response_model = bool)
def delete_news_comments_by_id(sysnews: int, db: Session = Depends(get_db)):
    db_comments = crud.get_news_comments_active_by_id(db, sysnews)
    if db_comments == []:
        raise HTTPException(status_code = 404, detail = "News Comments not found!")
    for db_comment in db_comments:
        crud.delete_comment(db, db_comment)
    return True
@app.put("/article/{sysnews}", response_model = bool)
def update_news(sysnews: int, req: schemas.NewsUpdate, db: Session = Depends(get_db)):
    db_news = crud.get_news_by_id(db, sysnews)
    if db_news:
        req_encoded = jsonable_encoder(req)
        db_news.title = req_encoded["title"]
        db_news.text = req_encoded["text"]
        match req_encoded["type"]:
            case 1:
                db_news.type = models.NewsType.culture
            case 2:
                db_news.type = models.NewsType.general
            case 3:
                db_news.type = models.NewsType.lifestyle
            case 4:
                db_news.type = models.NewsType.science
            case 5:
                db_news.type = models.NewsType.sport
                
        db_news.update_sysuser = req_encoded["update_sysuser"]
        db_news.update_date = datetime.datetime.utcnow()
        return crud.update_news(db, db_news)
    raise HTTPException(status_code = 404, detail = "Failed to update the article!")

@app.get("/article/{sysnews}/comments/active", response_model = list[schemas.Comment])
def read_news_comments_active_by_id(sysnews: int, db: Session = Depends(get_db)):
    db_comments = crud.get_news_comments_active_by_id(db, sysnews)
    if db_comments == []:
        raise HTTPException(status_code = 404, detail = "News Comments Active not found!")
    return db_comments

@app.get("/article/{sysnews}/comments/inactive", response_model = list[schemas.Comment])
def read_news_comments_inactive_by_id(sysnews: int, db: Session = Depends(get_db)):
    db_comments = crud.get_news_comments_inactive_by_id(db, sysnews)
    if db_comments == []:
        raise HTTPException(status_code = 404, detail = "News Comments Inactive not found!")
    return db_comments

@app.get("/article/{sysnews}/create_user", response_model = schemas.User)
def read_news_create_user_by_id(sysnews: int, db: Session = Depends(get_db)):
    db_user = crud.get_news_create_user_by_id(db, sysnews)
    if db_user is None:
        raise HTTPException(status_code = 404, detail = "News Create User not found!")
    return db_user

@app.get("/article/{sysnews}/update_user", response_model = schemas.User)
def read_news_update_user_by_id(sysnews: int, db: Session = Depends(get_db)):
    db_user = crud.get_news_update_user_by_id(db, sysnews)
    if db_user is None:
        raise HTTPException(status_code = 404, detail = "News Update User not found!")
    return db_user
#endregion

#region COMMENT
@app.get("/comments", response_model = list[schemas.Comment])
def read_comments(db: Session = Depends(get_db)):
    db_comments = crud.get_comments(db)
    if db_comments == []:
        raise HTTPException(status_code = 404, detail = "Comments not found!")
    return db_comments

@app.get("/comments/active", response_model = list[schemas.Comment])
def read_comments_active(db: Session = Depends(get_db)):
    db_comments = crud.get_comments_active(db)
    if db_comments == []:
        raise HTTPException(status_code = 404, detail = "Comments Active not found!")
    return db_comments

@app.get("/comments/inactive", response_model = list[schemas.Comment])
def read_comments_inactive(db: Session = Depends(get_db)):
    db_comments = crud.get_comments_inactive(db)
    if db_comments == []:
        raise HTTPException(status_code = 404, detail = "Comments Inactive not found!")
    return db_comments

@app.post("/comment", response_model = bool)
def create_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, comment.sysuser)
    if db_user is None:
        raise HTTPException(status_code = 404, detail = "User not found!")
    db_news = crud.get_news_by_id(db, comment.sysnews)
    if db_news is None:
        raise HTTPException(status_code = 404, detail = "News not found!")
    return crud.post_comment(db, comment)

@app.put("/comment/{syscomment}", response_model = bool)
def update_comment(syscomment:int, req: schemas.CommentUpdate, db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, syscomment)
    if db_comment:
        req_encoded = jsonable_encoder(req)
        db_comment.text = req_encoded["text"]
        db_comment.update_date = datetime.datetime.utcnow()
        return crud.update_comment(db, db_comment)
        
    raise HTTPException(status_code = 404, detail = "Failed to update the!")

@app.delete("/comment/{syscomment}", response_model = bool)
def delete_comment_by_id(syscomment: int, db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, syscomment)
    if db_comment is None:
        raise HTTPException(status_code = 404, detail = "Comment not found!")
    return crud.delete_comment(db, db_comment)

@app.get("/comment/{syscomment}", response_model = schemas.Comment)
def read_comment_by_id(syscomment: int, db: Session = Depends(get_db)):
    db_comment = crud.get_comment_by_id(db, syscomment)
    if db_comment is None:
        raise HTTPException(status_code = 404, detail = "Comment not found!")
    return db_comment

@app.get("/comment/{syscomment}/user", response_model = schemas.User)
def read_comment_user_by_id(syscomment: int, db: Session = Depends(get_db)):
    db_user = crud.get_comment_user_by_id(db, syscomment)
    if db_user is None:
        raise HTTPException(status_code = 404, detail = "Comment User not found!")
    return db_user

@app.get("/comment/{syscomment}/article", response_model = schemas.News)
def read_comment_news_by_id(syscomment: int, db: Session = Depends(get_db)):
    db_news = crud.get_comment_news_by_id(db, syscomment)
    if db_news is None:
        raise HTTPException(status_code = 404, detail = "Comment News not found!")
    return db_news
#endregion
