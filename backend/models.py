from sqlalchemy import Column, Integer, String, Date, Enum, DateTime
from database import Base, engine
from datetime import datetime
import enum

class GenderEnum(str, enum.Enum):
    MALE = "M"
    FEMALE = "F"
    NON_BINARY = "Non-Binary"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    date_of_birth = Column(Date, nullable=False)
    gender = Column(Enum(GenderEnum), nullable=False)
    date_created = Column(DateTime, default=datetime.now, nullable=False)

User.metadata.create_all(bind=engine)
