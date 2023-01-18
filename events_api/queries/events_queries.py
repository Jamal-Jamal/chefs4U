from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool
from datetime import date, time


class EventIn(BaseModel):
    venue: str
    description: str
    date: date
    time: time
    address: Optional[str]
    picture_url: Optional[str]


class EventOut(BaseModel):
    id: int
    venue: str
    description: str
    date: date
    time: time
    address: str
    picture_url: str
    chef_id: int
    users_favorited: Optional[list[int]]


class FavoriteEventIn(BaseModel):
    event_id: int


class EventRepository:
    def create(self, event: EventIn, user_id: int) -> EventOut:
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
                        user_id
                    ],
                )
                id = result.fetchone()[0]
                old_data = event.dict()
                return EventOut(id=id, chef_id=user_id, **old_data)

    def get_all(self) -> List[EventOut]:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    SELECT id, venue, description, date,
                        time, address, picture_url, chef_id,
                        users_favorited
                    FROM events;
                    """
                )
                result = []
                for record in db:
                    event = EventOut(
                        id=record[0],
                        venue=record[1],
                        description=record[2],
                        date=record[3],
                        time=record[4],
                        address=record[5],
                        picture_url=record[6],
                        chef_id=record[7],
                        users_favorited=record[8]
                    )
                    result.append(event)
                return result

    def favorite(self, event: FavoriteEventIn, user_id: int):
        with pool.connection() as connection:
            with connection.cursor() as db:
                result = db.execute(
                    """
                    SELECT users_favorited
                    FROM events
                    WHERE id = %s;
                    """,
                    [event.event_id]
                )
                for row in result:
                    user_fav = row[0]
                    if user_fav is None or user_id not in user_fav:
                        result = db.execute(
                            """
                            UPDATE events
                            SET users_favorited
                                = array_append(users_favorited, %s)
                            WHERE id = %s;
                            """,
                            [user_id, event.event_id]
                        )
                    else:
                        result = db.execute(
                            """
                            UPDATE events
                            SET users_favorited
                                = array_remove(users_favorited, %s)
                            WHERE id = %s;
                            """,
                            [user_id, event.event_id]
                        )
                    return True
                return False

    def delete(self, event_id: int, chef_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT chef_id
                    FROM events
                    WHERE id=%s;
                    """,
                    [event_id]
                )
                for row in result:
                    if chef_id == row[0]:
                        db.execute(
                            """
                            DELETE FROM events
                            WHERE id = %s;
                            """,
                            [event_id]
                        )
                        return True
                    else:
                        return False
