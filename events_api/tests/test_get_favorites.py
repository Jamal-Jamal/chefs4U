from queries.events_queries import EventRepository, EventOut
from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from datetime import datetime


favorites_out = EventOut(
    id=2,
    venue="string",
    description="string",
    date="2023-02-03",
    time="18:30:00",
    address="string",
    picture_url="string",
    chef_id=1,
    users_favorited=[4],
)

test_account_data = {
    "id": "4",
    "username": "string",
    "name": "string",
    "is_chef": "True",
    "pay_rate": "string",
    "cuisine": "string",
    "years_of_experience": "0",
    "picture_url": "string",
    "events_favorited": "[1]",
}

client = TestClient(app)


class FakeEventRepository:
    def get_user_favorites(self, user_id):
        return [favorites_out]


class FakeAuthenticator:
    def get_current_account_data(self):
        return test_account_data


def fake_authenticator():
    return test_account_data


def test_get_user_favorites():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_authenticator
    app.dependency_overrides[EventRepository] = FakeEventRepository
    response = client.get("/api/favorite")
    data = response.json()
    data[0]["time"] = datetime.strptime(data[0]["time"], "%H:%M:%S").time()
    data[0]["date"] = datetime.strptime(data[0]["date"], "%Y-%m-%d").date()
    assert data == [favorites_out.dict()]
    assert response.status_code == 200
    app.dependency_overrides = {}
