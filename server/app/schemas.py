# For pydantic schemas
from pydantic import BaseModel, EmailStr, Field
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
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


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: PyObjectId = None
    email: EmailStr
    created_at: datetime
    categories: List[str]

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True
        arbitrary_types_allowed = True


class TokenData(BaseModel):
    user_id: str


class LoginResponse(BaseModel):
    user_id: str
    access_token: str
    token_type: str


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None

    class Config:
        arbitrary_types_allowed = True


class StockData(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id")
    ticker: str
    date: str
    open: float
    high: float
    low: float
    close: float
    volume: int
    afterHours: Optional[float]
    preMarket: Optional[float]
    company: str
    logo_url: Optional[str]

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True


class StockResponse(BaseModel):
    data: List[StockData]
    sector: str
