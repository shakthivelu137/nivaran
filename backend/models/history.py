from sqlalchemy import Integer, String, Text, ForeignKey, Column, DateTime
from sqlalchemy.sql import func
from models.base import Base


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    symptoms = Column(Text, nullable=False)    # JSON string
    result = Column(Text, nullable=False)       # JSON string
    created_at = Column(DateTime, server_default=func.now())
