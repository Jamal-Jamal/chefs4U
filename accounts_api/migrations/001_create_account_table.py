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
            pay_rate TEXT NOT NULL,
            cuisine TEXT NOT NULL,
            years_of_experience INTEGER NOT NULL,
            picture_url TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ]
]
