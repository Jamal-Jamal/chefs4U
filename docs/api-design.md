### Get a list of chefs

- Endpoint path: /chefs/
- Endpoint method: GET

- Response: A list of chefs
- Response shape:
  ```json
  {
    "chefs": [
      {
        "id": number,
        "first_name": string,
        "last_name": string,
        "payrate": float,
        "cuisine": string,
        "years_of_experience": number,
        "picture_url": string,
      }
    ]
  }
  ```

### Get chef detail

- Endpoint path: /chefs/\<id>
- Endpoint method: GET

- Response: A chef's detail
- Response shape:
  ```json
  {
    "id": number,
    "first_name": string,
    "last_name": string,
    "payrate": float,
    "cuisine": string,
    "years_of_experience": number,
    "picture_url": string,
  }
  ```

### Create a chef

- Endpoint path: /chefs/
- Endpoint method: POST

- Request shape:

  ```json
  {
    "first_name": string,
    "last_name": string,
    "payrate": float,
    "cuisine": string,
    "years_of_experience": number,
    "picture_url": string,
  }
  ```

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
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
    "first_name": string,
    "last_name": string,
    "payrate": float,
    "cuisine": string,
    "years_of_experience": number,
    "picture_url": string,
  }
  ```

- Response: The chef's detail
- Response shape:
  ```json
  {
    "first_name": string,
    "last_name": string,
    "payrate": float,
    "cuisine": string,
    "years_of_experience": number,
    "picture_url": string,
  }
  ```

### Get a list of events

- Endpoint path: /events/
- Endpoint method: GET

- Response: A list of events
- Response shape:
  ```json
  {
    "events": [
      {
        "id": number,
        "venue": string,
        "date": date,
        "time": time,
        "address": string,
        "picture_url": string,
      }
    ]
  }
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
    "start_date": datetime,
    "end_date": datetime,
    "address": string,
    "picture_url": string,
  }
  ```

- Response: An indication of success or failure
- Response shape:
  ```json
  {
    "success": boolean,
    "message": string
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
