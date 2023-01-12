<<<<<<< HEAD
# router.py
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from queries.accounts_queries import (
    AccountIn,
    AccountOut,
    AccountRepository,
    DuplicateAccountError,
)


=======
# from fastapi import APIRouter, Depends
# from queries.accounts_queries import AccountIn, AccountRespository


# router = APIRouter()


# @router.post("/accounts")
# def create_account(account: AccountIn, repo: AccountRespository = Depends()):
#     return repo.create(account)

# router.py
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.accounts_queries import (
    AccountIn,
    AccountOut,
    AccountRespository,
    DuplicateAccountError,
)

>>>>>>> testing-backend-auth
class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountRespository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())
