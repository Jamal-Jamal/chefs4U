from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool
from datetime import date, time


class Error(BaseModel):
    message: str


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


class FavoriteListOut(BaseModel):
    users_favorited: list[int]


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
                            WHERE id = %s
                            RETURNING events.users_favorited;
                            """,
                            [user_id, event.event_id]
                        )
                    else:
                        result = db.execute(
                            """
                            UPDATE events
                            SET users_favorited
                                = array_remove(users_favorited, %s)
                            WHERE id = %s
                            RETURNING events.users_favorited;
                            """,
                            [user_id, event.event_id]
                        )
                    users = result.fetchone()[0]
                    return FavoriteListOut(users_favorited=users)

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

    def get_user_favorites(self, user_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM events
                    """
                )
                fav_list = []
                for row in result:
                    if row[8] and user_id in row[8]:
                        event = EventOut(
                            id=row[0],
                            venue=row[1],
                            description=row[2],
                            date=row[3],
                            time=row[4],
                            address=row[5],
                            picture_url=row[6],
                            chef_id=row[7],
                            users_favorited=row[8]
                        )
                        fav_list.append(event)
                return fav_list

    def update(self, event_id: int,
               event: EventIn,
               chef_id: int) -> Union[EventOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get cursor (something to run SQL with)
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
                        print(row[0])
                        if chef_id == row[0]:
                            db.execute(
                                """
                                UPDATE events
                                SET venue = %s
                                , description = %s
                                , date = %s
                                , time = %s
                                , address = %s
                                , picture_url = %s
                                WHERE id = %s
                                """,
                                [
                                    event.venue,
                                    event.description,
                                    event.date,
                                    event.time,
                                    event.address,
                                    event.picture_url,
                                    event_id,
                                ]
                            )
                        old_data = event.dict()
                        return EventOut(id=event_id,
                                        chef_id=chef_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not get all events"}

    def get_detail(self, event_id: int) -> Union[Error, EventOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM events
                        WHERE id = %s;
                        """,
                        [event_id]
                    )
                    event = result.fetchone()
                    event_out = EventOut(
                        id=event[0],
                        venue=event[1],
                        description=event[2],
                        date=event[3],
                        time=event[4],
                        address=event[5],
                        picture_url=event[6],
                        chef_id=event[7],
                        users_favorited=event[8],
                    )
                    return event_out
        except Exception as e:
            print(e)
            return {"message": "No such event exist"}
