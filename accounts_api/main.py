from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts_routers
from authenticator import authenticator
import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts_routers.router)

origins = [
    "http://localhost:3000",
    os.environ.get("PUBLIC_URL", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
