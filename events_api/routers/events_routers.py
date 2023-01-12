from fastapi import APIRouter, Depends
from typing import List
from queries.events_queries import (
    EventIn,
    EventRepository,
    EventOut,
)


router = APIRouter()


@router.post("/events", response_model=EventOut)
def create_event(
    event: EventIn,
    repo: EventRepository = Depends(),
) -> EventOut:
    return repo.create(event)


@router.get("/events", response_model=List[EventOut])
def get_all(
    repo: EventRepository = Depends(),
):
    return repo.get_all()
