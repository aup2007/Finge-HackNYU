from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorDatabase
from . import schemas
from .database import get_mongo_db
from .config import settings
from bson import ObjectId

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = settings.AUTH_SECRET_KEY
ALGORITHM = settings.AUTH_ALGORITHM
JWT_EXPIRY_MINUTES = settings.JWT_EXPIRY_MINUTES


def create_access_code(data: dict):
    to_encode = data.copy()
    # Increase expiry time for testing
    expire = datetime.now() + timedelta(minutes=500)
    print(f"Token will expire at: {expire}")
    to_encode.update({"exp": expire.timestamp()})
    encoded_token = jwt.encode(to_encode, key=SECRET_KEY, algorithm=ALGORITHM)
    return encoded_token


def verify_access_token(token: str, credentials_exception):
    try:
        print("Step 1: Starting token verification")
        print(f"Current UTC time: {datetime.utcnow()}")
        payload = jwt.decode(token, key=SECRET_KEY, algorithms=[ALGORITHM])
        print(f"Step 2: Decoded payload: {payload}")
        print(f"Expiry timestamp: {payload.get('exp')}")

        id: str = payload.get("user_id")
        print(f"Step 3: Extracted user_id: {id}")

        if not id:
            print("Step 4a: No user_id found in token")
            raise credentials_exception

        token_data = schemas.TokenData(user_id=id)
        print("Step 4b: Token data created successfully")
        return token_data

    except JWTError as e:
        print(f"Step X: JWT verification failed: {e}")
        raise credentials_exception


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncIOMotorDatabase = Depends(get_mongo_db)
):
    try:
        print("\n=== Starting get_current_user ===")
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )

        print("Step 1: Verifying access token")
        token_data = verify_access_token(token, credentials_exception)

        print(f"Step 2: Finding user with id: {token_data.user_id}")
        # Fix: Change collection name to match auth.py
        user = await db.Users.find_one({"_id": ObjectId(token_data.user_id)})
        print(f"Step 3: User found: {user is not None}")

        if user is None:
            print("Step 4a: User not found in database")
            raise credentials_exception

        print("Step 4b: User authentication successful")
        return user

    except Exception as e:
        print(f"Error in get_current_user: {str(e)}")
        raise
