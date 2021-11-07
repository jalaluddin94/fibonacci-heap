from typing import Optional

from pydantic import BaseModel, EmailStr
from time import time

# Shared properties
class FibBase(BaseModel):
    nama: str
    umur: int

class FibInsert(FibBase):
    no_urut: int
    exec_time: float