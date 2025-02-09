from typing import List
from fastapi import APIRouter, Body, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..database import get_mongo_db
from .. import schemas, oauth2
from bson import ObjectId
from datetime import datetime

router = APIRouter(
    prefix="/users",
    tags=['Users']
)


@router.get("/current_user", response_model=schemas.UserResponse)
async def get_current_user(
    current_user: dict = Depends(oauth2.get_current_user)
):
    return current_user

@router.put("/current_user/update_categories", response_model=schemas.UserResponse)
async def update_user_preferences(
    prefs: schemas.PreferencesUpdate,
    current_user: dict = Depends(oauth2.get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_mongo_db)
):
    if prefs.categories == current_user.get("categories"):
        return current_user
    user_id = current_user.get("id")
    print("USER ID:", user_id)
    result = await db.Users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"categories": prefs.categories}}
    )
    print("RESULT:", result)
    print("MODIFIED:", result.modified_count)
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update categories"
        )
    # Fetch the updated user and convert _id to str:
    updated_user = await db.Users.find_one({"_id": ObjectId(user_id)})
    updated_user["id"] = str(updated_user["_id"])
    del updated_user["_id"]
    return updated_user


@router.get("/current_user/liked-stocks", response_model=List[schemas.LikedStock])
async def get_liked_stocks(
    current_user: dict = Depends(oauth2.get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_mongo_db)
):
    return current_user.get("likedStocks", [])

@router.post("/current_user/liked-stocks", response_model=schemas.UserResponse)
async def add_liked_stock(
    stock: schemas.StockLikeRequest,
    current_user: dict = Depends(oauth2.get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_mongo_db)
):
    user_id = current_user.get("id")
    # Add the new stock to the likedStocks array
    result = await db.Users.update_one(
        {"_id": ObjectId(user_id)},
        {"$addToSet": {"likedStocks": {
            "ticker": stock.ticker,
            "imageUrl": stock.imageUrl
        }}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to add stock to likes"
        )
    
    # Fetch and return updated user
    updated_user = await db.Users.find_one({"_id": ObjectId(user_id)})
    updated_user["id"] = str(updated_user["_id"])
    del updated_user["_id"]
    return updated_user

@router.delete("/current_user/liked-stocks/{ticker}", response_model=schemas.UserResponse)
async def remove_liked_stock(
    ticker: str,
    current_user: dict = Depends(oauth2.get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_mongo_db)
):
    user_id = current_user.get("id")
    result = await db.Users.update_one(
        {"_id": ObjectId(user_id)},
        {"$pull": {"likedStocks": {"ticker": ticker}}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to remove stock from likes"
        )
    
    # Fetch and return updated user
    updated_user = await db.Users.find_one({"_id": ObjectId(user_id)})
    updated_user["id"] = str(updated_user["_id"])
    del updated_user["_id"]
    return updated_user

@router.put("/current_user/liked-stocks", response_model=schemas.UserResponse)
async def update_liked_stocks(
    stocks: List[str] = Body(..., example=["AAPL", "GOOGL"]),
    current_user: dict = Depends(oauth2.get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_mongo_db)
):
    user_id = current_user.get("id")
    result = await db.Users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"likedStocks": stocks}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update liked stocks"
        )
    
    # Fetch and return updated user
    updated_user = await db.Users.find_one({"_id": ObjectId(user_id)})
    updated_user["id"] = str(updated_user["_id"])
    del updated_user["_id"]
    return updated_user


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
