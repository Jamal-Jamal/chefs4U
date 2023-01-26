# Data models

## Accounts microservice

---

### Accounts

| name                | type      | unique | optional |
| ------------------- | --------- | ------ | -------- |
| id                  | int       | yes    | no       |
| username            | string    | yes    | no       |
| name                | string    | no     | no       |
| is_chef             | boolean   | no     | no       |
| pay_rate            | string    | no     | yes      |
| cuisine             | string    | no     | yes      |
| years_of_experience | int       | no     | yes      |
| picture_url         | string    | no     | yes      |
| events_favorited    | list[int] | no     | no       |

## Events microservice

---

### Events

| name              | type      | unique | optional |
| ----------------- | --------- | ------ | -------- |
| id                | int       | yes    | no       |
| venue             | string    | no     | no       |
| description       | string    | no     | no       |
| date              | date      | no     | no       |
| time              | time      | no     | no       |
| address           | string    | no     | yes      |
| picture_url       | string    | no     | yes      |
| attendee_capacity | int       | no     | yes      |
| users_favorited   | list[int] | no     | no       |
