1/4/23

- worked on api design
- assign points to stories

1/5/23

- divide stories among members
- write out details for stories

1/6/23

- TODO finish api design + table design -> DONE
- TODO setup project directories and settings -> have some initialized stuff
  - create-multiple-databases script
  - dockerfile for relational-data
  - api-service folders and dockerfiles

1/9/23

- kayre -> started user tables
- david -> finished event tables, ready for code to be reviewed
- start working on react?
- start on stories
  - commands to access postgres
  - psql -U postgres
  - \l
  - \c <database name>
  - \dt
  - \d <table name>
- https://getbootstrap.com/docs/5.0/utilities/text/#text-alignment

- name branches after your story
- selectively git add, don't use git .
- if using npm install, cd into ghi

1/10/23

- decide redux vs redux toolkit -> redux tool kit
- auth very tricky, working through multiple errors
- hashed_password is not an attribute

1/11/23

- finished most of the event list building logic
- TODO: add the fetch functions after david's merge of get event list

1/12/23

- Q for group: do we want to allow a user to upload an image in sign up form / edit chef detail
- finished event list fetch
- TODO: need to integrate chef id number into event list route + get events
- TODO: ask david about getting events by id

- imports in accounts main.py
- signing keys in main
- app.add_middleware(
  CORSMiddleware,
  allow_origins=[
  os.environ.get("CORS_HOST", "http://localhost:3000")
  ],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
  )

1/13/23

- TODO: filter events in event list by chef id
  - this should happen on the front end

1/14/23

- Pretty much done with put request to edit user data
- Do I want to check if form data is the same as data in database?
  - less requests to backend

1/15/23

- initialized adding user to users favorited list in event tables
- where am i going to get user id from? -> front end?
  - front end sends a request or logged in user id in state somewhere

1/16/23

- completed merge requests
- finished favorite put endpoints on both accounts and events table
  - got exception handling to work!

1/17/23

- integrated authentication into events table
- more finishing touches to put endpoints to finalize them

1/18/23

- update chef profile endpoint requires form to submit data that remains the same AND new data
- finished get favorited events endpoint on events microservice

  - better to create an endpoint on the user table? and then front end selects those events
  - this would need an endpoint to choose specific events only

- edit the docker compose yaml
  - remove signing keys and put them in .env
- update dockerfiles
- change front end urls to environment urls (ask kayre if he's okay with this)

1/19/23

- need more pipeline minutes!
- setup caprover instance -> done
- all apps deployed! all microservices deployed!

  - updated dockerfiles
  - updated gitlab ci

- how to filter chefs?
- during fetch, loop through cuisines and add it a cuisine state
- fix functions that return AccountOut to also return events_favorited
- fix favorite endpoint urls

1/20/23

- front end and back end not talking to each other yet
  - CORS issue
- updated fastapi docs and routing
- BLOCKER with deployment, bad connection with psycopg to database
  - temp fix, hitting a simple get request 'unlocks' the rest of the endpoints
  - need to wrap all functions in try / except?
  - most endpoints aren't set up to handle no items in DB
  - events api is not getting token correctly

1/21/23

- lots of MRs to see test to bug fix deployed app
- psycopg error when creating account -> bad connection, db.execute failing
  - endpoints work after hitting an endpoint multiple times
  - db.execute not being awaited?
- need exception handling for queries
- question for monday: what is the base url for front end -> https://chefs4u.gitlab.io/chefs4u/ or https://chefs4u.gitlab.io/
- TODO: favorites list redirect to "/"
- check redirects after every form submission (EventForm known)

1/23/23

- attempt at fixing logout
  - our written code removes fastapi_token but does not clear token "state"
  - need to rehaul front end auth? or find a way to setToken to null

1/24/23

- played around with code to understand how auth.js works, learned about how the return is destructured and the order of the useToken() matters
- debugged jamal's chef list component
- hid buttons based on token state (login, signup, some list views)

1/25/23

- all mvp done
- login after signup doesn't add token to cookiestore immediately (only after refresh) (only on david's site?)
- take a look at favorite events
