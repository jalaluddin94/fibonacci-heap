from typing import Any, List
from time import time

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session
from app.api import deps

from app import crud, models, schemas

router = APIRouter()

@router.post("/", response_model=List[schemas.FibInsert])
def insert_heap(
    *,
    db: Session = Depends(deps.get_db),
    inputan: List[schemas.FibBase]
) -> Any:
    """
    Create new heap.
    """
    insert_heap = []
    for i in inputan:
        insert_heap.append(crud.fibheap.create(db, inputs=i))
    return insert_heap


@router.post("/process", response_model=str)
def process_heap(
    *,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Process min heap.
    """
    try:
        proc_heap = crud.fibheap.process_hajj(db)
    except:
        raise HTTPException(
            status_code=400,
            detail="The quota for Hajj is full.",
        )
    return proc_heap


@router.delete("/process", response_model=str)
def delete_heap_bulk(
    *,
    db: Session = Depends(deps.get_db),
    jml_org: int
) -> Any:
    """
    Delete heap bulk.
    """
    try:
        time1 = time()
        for person in range (1, jml_org+1):
            crud.fibheap.process_hajj(db)
        time2 = time()
        proc_heap = (time2-time1) * 1000
    except:
        raise HTTPException(
            status_code=400,
            detail="The people can not be deleted from Hajj quota.",
        )
    return proc_heap