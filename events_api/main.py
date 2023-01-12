from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import events_routers

app = FastAPI()
app.include_router(events_routers.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
