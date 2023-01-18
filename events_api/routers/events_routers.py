from fastapi import APIRouter, Depends, HTTPException
from typing import List
from authenticator import authenticator
from queries.events_queries import (
    EventIn,
    EventRepository,
    EventOut,
    FavoriteEventIn,
)


router = APIRouter()


@router.post("/api/events", response_model=EventOut)
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


@router.get("/api/events", response_model=List[EventOut])
def get_all(
    repo: EventRepository = Depends(),
):
    return repo.get_all()


@router.put("/api/events/favorite")
def favorite_event(
    event: FavoriteEventIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
):
    user_id = account_data["id"]
    if account_data:
        result = repo.favorite(event, user_id)
        if result:
            return result
        else:
            raise HTTPException(
                status_code=404,
                detail="Event does not exist"
            )
    else:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )
