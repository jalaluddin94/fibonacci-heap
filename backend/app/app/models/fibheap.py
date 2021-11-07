from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base

class FibonacciHeap(Base):
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True, nullable=False)
    umur = Column(Integer, index=True, nullable=False)
    no_urut = Column(Integer, nullable=True)