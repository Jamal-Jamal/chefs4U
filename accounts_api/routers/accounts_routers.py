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


<<<<<<< HEAD
# @router.post("/accounts")
# def create_account(account: AccountIn, repo: AccountRepository = Depends()):
#     return repo.create(account)

@router.get("/api/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }

=======
>>>>>>> testing-backend-auth
@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
<<<<<<< HEAD
    account: AccountRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    print("JWTPASSWORD****", hashed_password)
    try:
        account = account.create(info, hashed_password)
=======
    accounts: AccountRespository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
>>>>>>> testing-backend-auth
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
<<<<<<< HEAD
    print()
    token = await authenticator.login(response, request, form, account)
=======
    token = await authenticator.login(response, request, form, accounts)
>>>>>>> testing-backend-auth
    return AccountToken(account=account, **token.dict())
