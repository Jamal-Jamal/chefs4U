FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files in your service's directory
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY authenticator.py authenticator.py

# Copy all of the subdirectories in your service's directory
COPY queries queries
COPY routers routers

# Migrations needed for relational database
COPY migrations migrations

RUN python -m pip install -r requirements.txt
# CMD uvicorn main:app --host 0.0.0.0 --port $PORT
# CMD uvicorn main:app --host 0.0.0.0

# Runs migrations on relational database and runs service
CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 80
