from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session
from time import time
from random import randrange

from app.crud.fibheap_lib import LibFibonacciHeap
from app.crud.base import CRUDBase
from app.models.fibheap import FibonacciHeap
from app.schemas.fibheap import FibBase, FibInsert


class CRUDFibHeap(CRUDBase[FibonacciHeap, FibBase, FibInsert]):
    def create(self, db: Session, *, inputs: FibBase) -> FibInsert:
        f = LibFibonacciHeap()
        oddnumber = randrange(2, 9999, 2)
        if inputs.umur >= 60:
            time1 = time()
            x = f.insert(oddnumber)
            f.decrease_key(x, 1)
            time2 = time()
            y = f.find_min()
            db_obj = FibInsert(
                nama = inputs.nama,
                umur = inputs.umur,
                no_urut = y.key,
                exec_time = (time2 - time1) * 1000
            )
        else:
            time1 = time()
            f.insert(oddnumber)
            time2 = time()
            db_obj = FibInsert(
                nama = inputs.nama,
                umur = inputs.umur,
                no_urut = oddnumber,
                exec_time = (time2 - time1) * 1000
            )
        return db_obj

    def process_hajj(self, db: Session) -> float:
        f = LibFibonacciHeap()
        time1 = time()
        f.extract_min()
        time2 = time()
        return (time2-time1) * 1000


fibheap = CRUDFibHeap(FibonacciHeap)
