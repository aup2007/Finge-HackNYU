from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..database import get_mongo_db
from .. import schemas, oauth2
from datetime import datetime
import random

# API DESIGN
# So the user categories need to be initiated and updated
# Stuff to do:
# Filter by Industry -> For just all the companies,
# Filter
# Set up a date collected

# Find data for a specific company by Ticker


# API --> 
router = APIRouter(
    prefix="/data",
    tags=['Stock Data']
)


@router.get("/")
async def root():
    return {"HELLO": "WORLD"}


@router.get("/companies/fetch-all")
async def get_all_company_data(
    db: AsyncIOMotorDatabase = Depends(get_mongo_db),
    current_user: dict = Depends(oauth2.get_current_user)
):
    collections = ['Tech', 'Finance', 'Consumer', 'Energy']
    all_stocks = []

    for collection in collections:
        cursor = db[collection].find({})
        async for stock in cursor:
            stock["_id"] = str(stock["_id"])
            all_stocks.append(stock)
    print("ARRAY LENGTH: ", len(all_stocks))
    return {"stocks": all_stocks}


@router.get("/companies/{ticker}")
async def get_stock_by_ticker(
    ticker: str,
    db: AsyncIOMotorDatabase = Depends(get_mongo_db),
    current_user: dict = Depends(oauth2.get_current_user)
):
    collections = ['Tech', 'Finance', 'Consumer', 'Energy']
    print(f"Searching for ticker: {ticker.upper()}")

    for collection in collections:
        print(f"Searching in collection: {collection}")
        stock = await db[collection].find_one({"ticker": ticker.upper()})
        if stock:
            stock["_id"] = str(stock["_id"])
            print(f"Found stock in {collection} collection:", stock)
            print(type(stock))
            return stock
        print(f"Stock not found in {collection} collection")

    print(f"Stock {ticker.upper()} not found in any collection")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Stock with ticker {ticker} not found"
    )

@router.get("/news/{ticker}")
async def get_news_articles_by_company(ticker: str,
    db: AsyncIOMotorDatabase = Depends(get_mongo_db),
    current_user: dict = Depends(oauth2.get_current_user)):
    collection = "News"
    cursor = db[collection].find({"ticker": ticker.upper()})
    articles = await cursor.to_list(length=None)
    for article in articles:
        article["_id"] = str(article["_id"])
    return {"articles" : articles}
#Make sure that regardless of capitalization at any part, we get the right collections
valid_collections = {
    "tech": "Tech",
    "finance": "Finance",
    "consumer": "Consumer",
    "energy": "Energy"
}

@router.post("/companies/by-preferences")
async def get_companies_by_preferences(
    current_user: dict = Depends(oauth2.get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_mongo_db)
):
    # Use the saved categories in the user document
    user_categories = current_user.get("categories", [])
    stocks = []
    for cat in user_categories:
        collection_name = valid_collections.get(cat.lower())
        if collection_name:
            cursor = db[collection_name].find({})
            async for stock in cursor:
                stock["_id"] = str(stock["_id"])
                stocks.append(stock)
    if not stocks:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No stocks found matching your preferences"
        )
    random.shuffle(stocks)
    return {"stocks": stocks}