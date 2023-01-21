from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Union
from authenticator import authenticator
from queries.events_queries import (
    EventIn,
    EventRepository,
    EventOut,
    FavoriteEventIn,
    FavoriteListOut,
    Error
)


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/events", response_model=EventOut | HttpError)
def create_event(
    event: EventIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
) -> EventOut:
    user_id = account_data["id"]
    if account_data["is_chef"]:
        return repo.create(event, user_id)


@router.get("/api/events", response_model=List[EventOut] | HttpError)
def get_all(
    repo: EventRepository = Depends(),
):
    return repo.get_all()


@router.put("/api/events/{event_id}", response_model=EventOut)
def update_event(
    event_id: int,
    event: EventIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
) -> Union[Error, EventOut]:
    chef_id = account_data["id"]
    return repo.update(event_id, event, chef_id)


@router.delete("/api/events/{event_id}", response_model=bool | HttpError)
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
            detail="Item does not exist"
        )
    else:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )


@router.put("/api/favorite", response_model=FavoriteListOut | HttpError)
def favorite_event(
    event: FavoriteEventIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
) -> FavoriteListOut:
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


@router.get("/api/favorite", response_model=List[EventOut] | HttpError)
def favorite_list(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
) -> List[EventOut]:
    user_id = account_data["id"]
    if account_data:
        result = repo.get_user_favorites(user_id)
        return result


@router.get("/api/events/{event_id}", response_model=EventOut | HttpError)
def get_event(
    event_id: int,
    repo: EventRepository = Depends(),
) -> Union[Error, EventOut]:
    return repo.get_detail(event_id)
