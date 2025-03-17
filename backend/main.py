from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from datetime import date

app = FastAPI()

# User registration endpoint wip
# More data validation will be needed
# Use Swagger UI at http://127.0.0.1:8000/docs to test endpoint

@app.post("/users/")
def create_user(
    first_name: str, 
    last_name: str, 
    username: str, 
    email: str, 
    password: str, 
    date_of_birth: date, 
    gender: str, 
    db: Session = Depends(get_db)
):
    user = User(
        first_name=first_name, 
        last_name=last_name, 
        username=username, 
        email=email, 
        password=password, 
        date_of_birth=date_of_birth, 
        gender=gender
    )
    user.set_password(password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "first_name": user.first_name, "username": user.username, "email": user.email}
