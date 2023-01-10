from fastapi import FastAPI
from routers import accounts_routers
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.include_router(accounts_routers.router)

origins = [
    "http://localhost:3000",
    "http://localhost:15432",
    "http://localhost:8082",
    "http://localhost:8001",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
