from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..database import get_mongo_db
from .. import models, utils, oauth2, schemas
from fastapi.responses import JSONResponse

router = APIRouter(
    tags=[
        'Authentication'
    ])


@router.post("/login", response_model=schemas.loginResponse)
async def login(
    user_credentials: OAuth2PasswordRequestForm = Depends(),
    db: AsyncIOMotorDatabase = Depends(get_mongo_db)
):
    user = await db.users.find_one({"email": user_credentials.username})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="INVALID CREDENTIALS"
        )

    match = utils.verify(user_credentials.password, user["password"])
    if not match:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="INVALID CREDENTIALS"
        )

    access_token = oauth2.create_access_code(
        data={"user_id": str(user["_id"])})
    return {
        "user_id": str(user["_id"]),
        "access_token": access_token,
        "token_type": "bearer"
    }
