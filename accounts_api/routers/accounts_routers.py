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


class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()


# @router.post("/accounts")
# def create_account(account: AccountIn, repo: AccountRepository = Depends()):
#     return repo.create(account)


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    account: AccountRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = account.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, account)
    return AccountToken(account=account, **token.dict())
