from fastapi import APIRouter, Depends, HTTPException
from typing import List
from authenticator import authenticator
from queries.events_queries import (
    EventIn,
    EventRepository,
    EventOut,
)


router = APIRouter()


@router.post("/events", response_model=EventOut)
def create_event(
    event: EventIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
) -> EventOut:
    print(account_data)
    if account_data["is_chef"]:
        return repo.create(event)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.get("/events", response_model=List[EventOut])
def get_all(
    repo: EventRepository = Depends(),
):
    return repo.get_all()
