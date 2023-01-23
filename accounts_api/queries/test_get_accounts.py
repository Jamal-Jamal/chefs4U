from accounts_queries import AccountRepository, AccountOut
from fastapi.testclient import TestClient
from main import app


account_out = AccountOut(
    id=1,
    username="bobyyy",
    password="la",
    name="bobyyy",
    is_chef=True,
    pay_rate="bobyyy",
    cuisine="bobyyy",
    years_of_experience=0,
    picture_url="bobyyy",
    events_favorited=None,
)

client = TestClient(app)


class FakeAccountRepository:
    def get_all(self):
        return [account_out]


def test_get_all():
    app.dependency_overrides[AccountRepository] = FakeAccountRepository
    response = client.get("/accounts")
    assert response.status_code == 200
    assert response.json() == [account_out.dict()]
