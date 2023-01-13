from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import authenticator
from routers import accounts_routers


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts_routers.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
