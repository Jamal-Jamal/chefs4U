from fastapi import APIRouter, Depends
from queries.accounts_queries import AccountIn, AccountRespository, AccountOut
from typing import List, Union
from pydantic import BaseModel


router = APIRouter()

class Error(BaseModel):
    message: str

@router.post("/accounts")
def create_account(account: AccountIn, repo: AccountRespository = Depends()):
    return repo.create(account)


@router.get("/accounts", response_model=Union[Error, List[AccountOut]])
def get_all(
    repo: AccountRespository = Depends(),
):
    return repo.get_all()