from fastapi import FastAPI
from routers import accounts_routers
from authenticator import authenticator


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts_routers.router)
