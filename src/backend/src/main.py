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
#endregion
