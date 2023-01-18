from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Union
from authenticator import authenticator
from queries.events_queries import (
    EventIn,
    EventRepository,
    EventOut,
    FavoriteEventIn,
)


router = APIRouter()


class Error(BaseModel):
    message: str


@router.post("/api/events", response_model=EventOut)
def create_event(
    event: EventIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
) -> EventOut:
    user_id = account_data["id"]
    if account_data["is_chef"]:
        return repo.create(event, user_id)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.get("/api/events", response_model=List[EventOut])
def get_all(
    repo: EventRepository = Depends(),
):
    return repo.get_all()


@router.put("/events/{event_id}", response_model=Union[Error, EventOut])
def update_event(
    event_id: int,
    event: EventIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
) -> Union[Error, EventOut]:
    chef_id = account_data["id"]
    return repo.update(event_id, event, chef_id)


@router.delete("/api/events/{event_id}", response_model=bool)
def delete_event(
    event_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
) -> bool:
    chef_id = account_data["id"]
    response = repo.delete(event_id, chef_id)
    if response:
        return True
    elif response is None:
        raise HTTPException(
            status_code=404,
            detail="Item Doesnt Exist"
            )
    else:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
            )


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
