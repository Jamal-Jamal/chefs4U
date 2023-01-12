# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
<<<<<<< HEAD
from queries.accounts_queries import (
    AccountRepository,
    AccountOut,
    AccountOutWithPassword
)


class AppAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountRepository,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        repo = AccountRepository()
        return repo.get_user(username)

    def get_account_getter(
        self,
        accounts: AccountRepository = Depends()) -> AccountRepository:
=======
from queries.accounts_queries import AccountRespository, AccountOut, AccountOutWithPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountRespository,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountRespository = Depends(),
    ):
>>>>>>> testing-backend-auth
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        # Return the encrypted password value from your
        # account object
<<<<<<< HEAD
        print("***HASHED PASSWORD***", account)
        return account.hashed_password
=======
        return account.password
>>>>>>> testing-backend-auth

    def get_account_data_for_cookie(self, account: AccountOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, AccountOut(**account.dict())


<<<<<<< HEAD
authenticator = AppAuthenticator(os.environ["SIGNING_KEY"])
=======
authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
>>>>>>> testing-backend-auth
