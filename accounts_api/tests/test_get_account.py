from fastapi.testclient import TestClient
from queries.accounts_queries import AccountRepository, AccountOut
from typing import List
from main import app

client = TestClient(app)

account_db = [
    {
        "id": 1,
        "username": "bobyyy",
        "name": "bobyyy",
        "is_chef": True,
        "pay_rate": "bobyyy",
        "cuisine": "bobyyy",
        "years_of_experience": 0,
        "picture_url": "bobyyy",
        "events_favorited": [0],
    }
]


def set_account_db():
    return account_db


account_out = AccountOut(
    id=1,
    username="bobyyy",
    name="bobyyy",
    is_chef=True,
    pay_rate="bobyyy",
    cuisine="bobyyy",
    years_of_experience=0,
    picture_url="bobyyy",
    events_favorited=[0],
)


class FakeAccountRepository:
    def get_all(self) -> List[AccountOut]:
        return [account_out]


def test_get_all():
    app.dependency_overrides[AccountRepository] = FakeAccountRepository
    response = client.get("/api/accounts")
    assert response.status_code == 200
    assert response.json() == account_db
    app.dependency_overrides = {}
