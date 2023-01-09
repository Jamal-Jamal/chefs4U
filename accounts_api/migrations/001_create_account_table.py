steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            is_chef BOOL NOT NULL,
            pay_rate TEXT,
            cuisine TEXT,
            years_of_experience INTEGER,
            picture_url TEXT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ]
]
