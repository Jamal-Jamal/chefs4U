from authenticator import authenticator
from fastapi import FastAPI
from routers import accounts_routers


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts_routers.router)
