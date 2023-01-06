### Users table

- id serial primary key, not null
- username string, not null, (email)
- password string, not null
- first_name string, not null
- last_name string, not null
- is_chef boolean, not null, default = false
- payrate float, null, default = null
- cuisine string, null, default = null
- years_of_experience number, null, default = null
- picture_url string, null, default = null
- events_favorited list(foreign key to event id), null, default = empty list

### Events

- id serial primary key, not null
- venue string, not null
- date date, not null
- time time, not null
- address string, not null
- picture_url string, not null
- chef_id foreign key, not null
- users_favorited list(foreign key to user id), null, default = empty list
