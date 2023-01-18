import os
from jwtdown_fastapi.authentication import Authenticator


class MyAuthenticator(Authenticator):
    async def get_account_data(self):
        pass

    def get_account_getter(self, accounts):
        return accounts

    def get_hashed_password(self):
        pass


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
