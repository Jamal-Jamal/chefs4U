### «Human-readable of the endpoint»

- Endpoint path: «path to use»
- Endpoint method: «HTTP method»
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  «JSON-looking thing that has the
  keys and types in it»
  ```

- Response: «Human-readable description
  of response»
- Response shape (JSON):

  ```json
  «JSON-looking thing that has the
  keys and types in it»
  ```

  <!-- * Headers:
  * Authorization: Bearer token -->

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
        "name": string,
        "payrate": float,
        "culinary_expertise": string,
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
    "name": string,
    "payrate": float,
    "culinary_expertise": string,
    "years_of_experience": number,
    "picture_url": string,
    "events": [
        {
            "venue": string,
            "start_date": datetime,
            "end_date": datetime,
            "address": string,
        }
    ]
  }
  ```

### Create a chef

- Endpoint path: /chefs/
- Endpoint method: POST

* Request body:
  ```json
  {
    "name": string,
    "payrate": float,
    "culinary_expertise": string,
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

* Request body:
  ```json
  {
    "name": string,
    "payrate": float,
    "culinary_expertise": string,
    "years_of_experience": number,
    "picture_url": string,
  }
  ```

- Response: The chef's detail
- Response shape:
  ```json
  {
    "name": string,
    "payrate": float,
    "culinary_expertise": string,
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
            "start_date": datetime,
            "end_date": datetime,
            "address": string,
            "picture_url": string,
        }
    ]
  }
  ```

<!-- ### Get event detail

- Endpoint path: /events/\<id>
- Endpoint method: GET

- Response: An event detail
- Response shape:
  ```json
  {
    {
        "id": number,
        "venue": string,
        "start_date": datetime,
        "end_date": datetime,
        "address": string,
        "picture_url": string,
        "chef": {
            "id": number,
            "name": string,
        }
    }
  }
  ``` -->

### Create an event

- Endpoint path: /events/
- Endpoint method: POST

* Request body:
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

* Request body:
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
  email: string
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
