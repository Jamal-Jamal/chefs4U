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
from typing import List, Union
from queries.accounts_queries import (
    AccountIn,
    AccountInWithPassword,
    AccountOut,
    FavoriteIn,
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


class Error(BaseModel):
    message: str


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountInWithPassword,
    request: Request,
    response: Response,
    accounts: AccountRepository = Depends(),
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


@router.put("/api/accounts")
async def update_account(
    form_data: AccountIn,
    user_data: AccountOut = Depends(authenticator.get_current_account_data),
    accounts: AccountRepository = Depends(),
) -> AccountOut | HttpError:
    user_id = user_data["id"]
    if user_data:
        account = accounts.update(form_data, user_id)
        return account


@router.get("/api/accounts", response_model=Union[Error, List[AccountOut]])
def get_all(
    repo: AccountRepository = Depends(),
):
    return repo.get_all()


@router.put("/api/favorite")
def favorite_event(
    event: FavoriteIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    accounts: AccountRepository = Depends(),
):
    user_id = account_data["id"]
    return accounts.favorite(event, user_id)


@router.get("/api/chef/{id}", response_model=Union[Error, AccountOut])
def get_chef(
    id: int,
    repo: AccountRepository = Depends(),
) -> Union[Error, AccountOut]:
    return repo.get_detail(id)
