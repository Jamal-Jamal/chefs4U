from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import events_routers

app = FastAPI()
app.include_router(events_routers.router)

origins = [
    "http://localhost:3000",
    "https://chefs4u.gitlab.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
