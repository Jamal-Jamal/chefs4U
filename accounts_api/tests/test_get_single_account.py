from fastapi.testclient import TestClient
from queries.accounts_queries import AccountRepository, AccountOut
from typing import List
from main import app

client = TestClient(app)

account_db_single = [
    {
        "id": 1,
        "username": "test",
        "name": "test",
        "is_chef": True,
        "pay_rate": "test",
        "cuisine": "test",
        "years_of_experience": 0,
        "picture_url": "test",
        "events_favorited": [0],
    }
]


def set_account_db_single():
    return account_db_single


single_account_out = AccountOut(
    id=1,
    username="test",
    name="test",
    is_chef=True,
    pay_rate="test",
    cuisine="test",
    years_of_experience=0,
    picture_url="test",
    events_favorited=[0],
)


class SingleFakeRepository:
    def get_one(self) -> List[AccountOut]:
        return [single_account_out]


def test_get_single():
    app.dependency_overrides[AccountRepository] = SingleFakeRepository
    response = client.get("/api/chef{id}")
    assert response.status_code == 200
    assert response.json() == account_db_single
    app.dependency_overrides = {}
