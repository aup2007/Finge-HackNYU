from fastapi import FastAPI
from app.routers import some_router  # Import your routers here

app = FastAPI()

# Include routers
app.include_router(some_router.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}