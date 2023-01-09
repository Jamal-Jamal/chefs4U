from pydantic import BaseModel
from typing import Optional
from queries.pool import pool

class AccountIn(BaseModel):
    username: str
    password: str
    name: str
    is_chef: bool
    pay_rate: str
    cuisine: str
    years_of_experience: int
    picture_url: str


class AccountOut(BaseModel):
    id: int
    username: str
    name: str
    is_chef: bool
    pay_rate: str
    cuisine: str
    years_of_experience: int
    picture_url: str


class AccountRespository:
    def create(self, account: AccountIn) -> AccountOut:
        with pool.connection() as connection:
            with connection.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts
                        (username, password, name, is_chef, pay_rate, cuisine, years_of_experience, picture_url)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.username,
                        account.password,
                        account.name,
                        account.is_chef,
                        account.pay_rate,
                        account.cuisine,
                        account.years_of_experience,
                        account.picture_url,
                    ]
                )

                id = result.fetchone()[0]
                old_data = account.dict()
                return AccountOut(id=id, **old_data)
