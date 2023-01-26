### Get a list of chefs

- Endpoint path: /chefs/
- Endpoint method: GET

- Response: A list of chefs
- Response shape:
  ```json
  [
    {
      "id": number,
      "username": string,
      "name": string,
      "is_chef": boolean,
      "pay_rate": string,
      "cuisine": string,
      "years_of_experience": number,
      "picture_url": string,
      "events_favorited": list[number]
    }
  ]
  ```

### Get chef detail

- Endpoint path: /chefs/\<id>
- Endpoint method: GET

- Response: A chef's detail
- Response shape:
  ```json
  {
    "id": number,
    "username": string,
    "name": string,
    "is_chef": boolean,
    "pay_rate": string,
    "cuisine": string,
    "years_of_experience": number,
    "picture_url": string,
    "events_favorited": list[number]
  }
  ```

### Create a chef

- Endpoint path: /chefs/
- Endpoint method: POST

- Request shape:

  ```json
  {
    "username": string,
    "name": string,
    "is_chef": boolean,
    "pay_rate": float,
    "cuisine": string,
    "years_of_experience": number,
    "picture_url": string,
    "password": string
  }
  ```

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "access_token": string,
    "token_type": "Bearer",
    "account": {
      "id": number,
      "username": string,
      "name": string,
      "is_chef": boolean,
      "pay_rate": string,
      "cuisine": string,
      "years_of_experience": number,
      "picture_url": string,
      "events_favorited": list[number]
    }
  }
  ```

### Edit chef detail

- Endpoint path: /chefs/\<id>
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape:

  ```json
  {
    "username": string,
    "name": string,
    "is_chef": boolean,
    "pay_rate": float,
    "cuisine": string,
    "years_of_experience": number,
    "picture_url": string,
    "events_favorited": list[number]
  }
  ```

- Response: The chef's detail
- Response shape:
  ```json
  {
    "username": string,
    "name": string,
    "is_chef": boolean,
    "pay_rate": float,
    "cuisine": string,
    "years_of_experience": number,
    "picture_url": string,
    "events_favorited": list[number]
  }
  ```

### Get a list of all events

- Endpoint path: /events/
- Endpoint method: GET

- Response: A list of all events
- Response shape:
  ```json
  [
    {
      "id": number,
      "venue": string,
      "description": string,
      "date": date,
      "time": time,
      "address": string,
      "picture_url": string,
      "attendee_capacity": number,
      "chef_id": number,
      "users_favorited": list[number]
    }
  ]
  ```

### Create an event

- Endpoint path: /events/
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request shape:

  ```json
  {
    "venue": string,
    "description": string,
    "date": date,
    "time": time with timezone,
    "address": string,
    "picture_url": string,
    "attendee_capacity": number,
    "chef_id": number
  }
  ```

- Response: An indication of success
- Response shape:
  ```json
  {
    "id": number,
    "venue": string,
    "description": string,
    "date": date,
    "time": time with timezone,
    "address": string,
    "picture_url": string,
    "attendee_capacity": number,
    "chef_id": number,
    "users_favorited": list[number]
  }
  ```

### Edit an event

- Endpoint path: /events/\<id>
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape:

  ```json
  {
    "venue": string,
    "start_date": datetime,
    "end_date": datetime,
    "address": string,
    "picture_url": string,
    "attendee_capacity": number,

  }
  ```

- Response: The event's detail
- Response shape:
  ```json
  {
    "venue": string,
    "start_date": datetime,
    "end_date": datetime,
    "address": string,
    "picture_url": string,
    "attendee_capacity": number,
    "users_favorited": list[number]
  }
  ```

### Delete an event

- Endpoint path: /events/\<id>
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
  }
  ```

### Log in

- Endpoint path: /token
- Endpoint method: POST

- Request shape (form):

  ```
  username: string
  password: string
  ```

- Response: Account information and a token
- Response shape (JSON):
  ```json
  {
    "account": {
      «key»: type»,
    },
    "token": string
  }
  ```

### Log out

- Endpoint path: /token
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```
