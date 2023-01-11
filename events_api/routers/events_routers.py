from fastapi import APIRouter, Depends
from queries.events_queries import (
    EventIn,
    EventRespository,
    EventOut,
)


router = APIRouter()


@router.post("/events", response_model=EventOut)
def create_event(
    event: EventIn,
    repo: EventRespository = Depends(),
) -> EventOut:
    return repo.create(event)
