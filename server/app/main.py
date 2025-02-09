from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, users, data, chat
# from .routers import #file names here

app = FastAPI()

# Allow all origins in production for now
# You can make this more restrictive later
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


# app.include_router(post.router)
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(data.router)
app.include_router(chat.router)


@app.get("/")
async def read_root():
    return {"status": "API is running"}

@app.options("/{full_path:path}")
async def options_route(full_path: str):
    """Handle OPTIONS requests for CORS preflight"""
    return Response(status_code=200)
