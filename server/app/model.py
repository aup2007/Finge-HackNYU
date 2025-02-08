from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)


class UserModel(BaseModel):
    id: Optional[PyObjectId] = None
    email: EmailStr
    password: str
    created_at: datetime = datetime.now()

    class Config:
        json_encoders = {ObjectId: str}
