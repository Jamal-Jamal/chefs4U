steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY NOT NULL,
            venue VARCHAR(1000) NOT NULL,
            description TEXT NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            address VARCHAR(1000),
            picture_url VARCHAR(1000),
            attendee_capacity integer,
            chef_id integer NOT NULL,
            users_favorited integer[]
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE events;
        """
    ]
]
