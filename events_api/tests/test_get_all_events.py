from queries.events_queries import EventRepository, EventOut
from fastapi.testclient import TestClient
from main import app
from datetime import datetime

event_out = EventOut(
    id=1,
    venue="Costco",
    description="Costco food court extravaganza",
    date="2023-02-03",
    time="18:30:00",
    address="120 Costco Lane",
    picture_url="string",
    attendee_capacity=100,
    chef_id=1,
    users_favorited=None,
)

client = TestClient(app)


class FakeEventRepository:
    def get_all(self):
        return [event_out]


def test_get_all_events():
    app.dependency_overrides[EventRepository] = FakeEventRepository
    response = client.get("/api/events")
    data = response.json()
    data[0]["time"] = datetime.strptime(data[0]["time"], "%H:%M:%S").time()
    data[0]["date"] = datetime.strptime(data[0]["date"], "%Y-%m-%d").date()
    assert data == [event_out.dict()]
    assert response.status_code == 200
    app.dependency_overrides = {}
