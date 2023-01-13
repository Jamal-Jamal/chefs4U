from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class Error(BaseModel):
    message: str


class AccountIn(BaseModel):
    username: str
    password: str
    name: str
    is_chef: bool
    pay_rate: Optional[str]
    cuisine: Optional[str]
    years_of_experience: Optional[int]
    picture_url: Optional[str]


class AccountOut(BaseModel):
    id: int
    username: str
    name: str
    is_chef: bool
    pay_rate: Optional[str]
    cuisine: Optional[str]
    years_of_experience: Optional[int]
    picture_url: Optional[str]


class AccountOutWithPassword(AccountOut):
    password: str


class AccountRepository:
    def create(
        self,
        account: AccountIn,
        hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as connection:
            with connection.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts
                        (username, password, name, is_chef, pay_rate,
                        cuisine, years_of_experience, picture_url)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.username,
                        hashed_password,
                        account.name,
                        account.is_chef,
                        account.pay_rate,
                        account.cuisine,
                        account.years_of_experience,
                        account.picture_url,
                    ],
                )

                id = result.fetchone()[0]
                old_data = account.dict()

                return AccountOutWithPassword(id=id, **old_data)

    def get(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as connection:
            with connection.cursor() as db:
                result = db.execute(
                    """
                    SELECT (id, username, name, is_chef, pay_rate, cuisine,
                            years_of_experience, picture_url, password)
                    FROM accounts
                    WHERE username=(%s);
                    """,
                    [username],
                )
                row = result.fetchone()[0]
        if not result:
            return None
        return AccountOutWithPassword(
                id=row[0],
                username=row[1],
                name=row[2],
                is_chef=row[3],
                pay_rate=row[4],
                cuisine=row[5],
                years_of_experience=row[6],
                picture_url=row[7],
                password=row[8]
            )

    def get_all(self) -> Union[Error, List[AccountOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, username, name, is_chef, pay_rate,
                        cuisine, years_of_experience, picture_url
                        FROM accounts
                        ORDER BY name;
                        """
                    )
                    result = []
                    for record in db:
                        Account = AccountOut(
                            id=record[0],
                            username=record[1],
                            name=record[2],
                            is_chef=record[3],
                            pay_rate=record[4],
                            cuisine=record[5],
                            years_of_experience=record[6],
                            picture_url=record[7],
                        )
                        result.append(Account)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all accounts"}
