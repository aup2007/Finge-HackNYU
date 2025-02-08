from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..database import get_mongo_db
from .. import schemas, oauth2
from bson import ObjectId
from datetime import datetime

router = APIRouter(
    prefix="/users",
    tags=['Users']
)


@router.get("/me", response_model=schemas.UserResponse)
async def get_current_user(
    current_user: dict = Depends(oauth2.get_current_user)
):
    return current_user


@router.get("/{id}", response_model=schemas.UserResponse)
async def get_user(
    id: str,
    db: AsyncIOMotorDatabase = Depends(get_mongo_db),
    current_user: dict = Depends(oauth2.get_current_user)
):
    user = await db.Users.find_one({"_id": ObjectId(id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found"
        )
    return user


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    id: str,
    db: AsyncIOMotorDatabase = Depends(get_mongo_db),
    current_user: dict = Depends(oauth2.get_current_user)
):
    if str(current_user["_id"]) != id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to perform this action"
        )

    delete_result = await db.Users.delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found"
        )


@router.put("/{id}", response_model=schemas.UserResponse)
async def update_user(
    id: str,
    user_update: schemas.UserUpdate,
    db: AsyncIOMotorDatabase = Depends(get_mongo_db),
    current_user: dict = Depends(oauth2.get_current_user)
):
    if str(current_user["_id"]) != id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to perform this action"
        )

    update_data = user_update.model_dump(exclude_unset=True)

    if len(update_data) < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid update data provided"
        )

    result = await db.Users.update_one(
        {"_id": ObjectId(id)},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found"
        )

    updated_user = await db.Users.find_one({"_id": ObjectId(id)})
    return updated_user
