from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, users, data
# from .routers import #file names here

app = FastAPI()
origins = ["0.0.0.0/0"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# app.include_router(post.router)
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(data.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
