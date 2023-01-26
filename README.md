# Module 3 Project Gamma

## Chefs4U

---

Created by:

- Alissa Ramos
- David Funnell
- Jamal Degratto
- Kayre Santos
- Ryan Lu

### Project Description

---

- Chefs4U is a web application that connects users to top local chefs in their area
- Users can create an account and login as either a chef or a foodie
- A user with the Chef role can create/host an event
- A user with the Chef role can edit their profile and their events
- A user can filter chefs by cuisine
- A user can view all chefs
- A user can view chef profiles
- A user can favorite events and add it to their favorites list

### Design

---

- [API Design](docs/api-design.md)
- [Data models](docs/data-models.md)

### How to Run the Project

---

1. Fork and clone the project from https://gitlab.com/chefs4u/chefs4u

2. Copy the clone with the HTTPS link

3. Open up a command terminal and cd into your project directory.

   a. `git clone <HTTPS Link>`

   b. `cd chefs4u`

   c. `docker volume create postgres-data`

   d. `docker volume create pg-admin`

   e. `docker compose build`

   f. `docker compose up`

4. Open up Docker Desktop and ensure all containers are running without errors

5. Open your browser and navigate to: http://localhost:3000
