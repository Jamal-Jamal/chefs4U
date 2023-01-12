# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
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
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        # Return the encrypted password value from your
        # account object
        print("***HASHED PASSWORD***", account)
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, AccountOut(**account.dict())


authenticator = AppAuthenticator(os.environ["SIGNING_KEY"])
