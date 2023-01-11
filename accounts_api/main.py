from fastapi import FastAPI
from routers import accounts_routers


app = FastAPI()
app.include_router(accounts_routers.router)
