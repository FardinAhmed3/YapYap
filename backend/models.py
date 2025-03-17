from sqlalchemy import Column, Integer, String, Date, Enum
from sqlalchemy.orm import declarative_base
from passlib.context import CryptContext
import enum

Base = declarative_base()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

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

    def set_password(self, password: str):
        self.password = hash_password(password)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.password)