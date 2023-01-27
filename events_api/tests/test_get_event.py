from queries.events_queries import EventRepository, EventOut
from fastapi.testclient import TestClient
from main import app
from datetime import datetime

client = TestClient(app)

event_db_single = EventOut(
    id=1,
    venue="Portland",
    description="Pioneer Square foodie event",
    date="2023-07-01",
    time="18:00:00",
    address="Pioneer Square",
    picture_url="string",
    attendee_capacity=300,
    chef_id=1,
    users_favorited=None,
)


class FakeSingleEventRepository:
    def get_detail(self, event_id):
        return event_db_single


def test_get_event():
    app.dependency_overrides[EventRepository] = FakeSingleEventRepository
    response = client.get("/api/events/1")
    data = response.json()
    data["time"] = datetime.strptime(data["time"], "%H:%M:%S").time()
    data["date"] = datetime.strptime(data["date"], "%Y-%m-%d").date()
    assert data == event_db_single.dict()
    assert response.status_code == 200
    app.dependency_overrides = {}
