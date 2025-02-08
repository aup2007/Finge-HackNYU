from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
# Need to set up mongo
from ..database import get_db
from .. import models, utils, oauth2, schemas
from fastapi.responses import JSONResponse

router = APIRouter(
    tags=[
        'Authentication'
    ])


@router.post("/login", response_model=schemas.loginResponse)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        models.User.email == user_credentials.username).first()
    if not user:
        raise (HTTPException(status_code=status.HTTP_403_FORBIDDEN,
               detail=f"INVALID CREDENTIALS"))
    match = utils.verify(user_credentials.password, user.password)
    if not match:
        raise (HTTPException(status_code=status.HTTP_403_FORBIDDEN,
               detail="INVALID CREDENTIALS"))
    # Here the dictionary could realistically include all the authorizations of the user, but
    # for our purposes right now Imma just send the user id back
    access_token = oauth2.create_access_code(data={"user_id": str(user.id)})
    return JSONResponse(
        content={
            "user_id": user.id,
            "access_token": access_token,
            "token_type": "bearer"
        }
    )
