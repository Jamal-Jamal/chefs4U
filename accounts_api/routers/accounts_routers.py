from fastapi import APIRouter, Depends
from queries.accounts_queries import AccountIn, AccountRespository


router = APIRouter()


@router.post("/accounts")
def create_account(
    account: AccountIn,
    repo: AccountRespository = Depends()
):
    return repo.create(account)
