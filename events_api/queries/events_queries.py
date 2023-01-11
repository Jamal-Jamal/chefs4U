from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class EventIn(BaseModel):
    venue: str
    description: str
    date: str
    time: str
    address: Optional[str]
    picture_url: Optional[str]
    chef_id: int


class EventOut(BaseModel):
    id: int
    venue: str
    description: str
    date: str
    time: str
    address: str
    picture_url: str
    chef_id: int


class EventRespository:
    def create(self, event: EventIn) -> EventOut:
        with pool.connection() as connection:
            with connection.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO events
                        (venue, description, date, time, address,
                        picture_url, chef_id)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        event.venue,
                        event.description,
                        event.date,
                        event.time,
                        event.address,
                        event.picture_url,
                        event.chef_id,
                    ],
                )
                id = result.fetchone()[0]
                old_data = event.dict()
                return EventOut(id=id, **old_data)
