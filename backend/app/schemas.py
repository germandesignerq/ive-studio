from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


class LeadIn(BaseModel):
    """То, что уходит из формы на сайте."""

    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    message: str = Field(default="", max_length=5000)
    company: Optional[str] = Field(default=None, max_length=200)
    project: Optional[str] = Field(default=None, max_length=120)
    budget: Optional[str] = Field(default=None, max_length=120)
    timeline: Optional[str] = Field(default=None, max_length=120)
    plan: Optional[str] = Field(default=None, max_length=120)
    source: str = Field(min_length=1, max_length=200)

    @field_validator("name", "message", "source")
    @classmethod
    def strip_text(cls, v: str) -> str:
        return v.strip()

    @field_validator("name")
    @classmethod
    def name_is_real(cls, v: str) -> str:
        if len(v) < 2:
            raise ValueError("Please enter your name")
        return v


class LeadOut(BaseModel):
    id: int
    created_at: str


class LeadRecord(LeadIn):
    """Заявка из базы — с идентификатором и временем."""

    id: int
    created_at: str
    ip: Optional[str] = None
