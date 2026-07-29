import logging
from typing import List, Optional

from fastapi import APIRouter, Depends, Header, HTTPException, Request, status

from ..config import settings
from ..db import insert_lead, list_leads
from ..schemas import LeadIn, LeadOut, LeadRecord

router = APIRouter(prefix="/api", tags=["leads"])
log = logging.getLogger("ive.leads")


def require_admin(x_admin_token: Optional[str] = Header(default=None)) -> None:
    """Чтение заявок закрыто токеном. Пустой токен в настройках = эндпоинт выключен."""
    if not settings.admin_token:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found")
    if x_admin_token != settings.admin_token:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Bad token")


@router.post("/leads", response_model=LeadOut, status_code=status.HTTP_201_CREATED)
def create_lead(lead: LeadIn, request: Request) -> LeadOut:
    client_ip = request.client.host if request.client else None
    row = insert_lead(lead, client_ip)
    log.info("lead #%s from %s (%s)", row["id"], row["email"], row["source"])
    return LeadOut(id=row["id"], created_at=row["created_at"])


@router.get("/leads", response_model=List[LeadRecord], dependencies=[Depends(require_admin)])
def read_leads(limit: int = 100, offset: int = 0) -> List[LeadRecord]:
    limit = max(1, min(limit, 500))
    return [LeadRecord(**dict(row)) for row in list_leads(limit, offset)]
