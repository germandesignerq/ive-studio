import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from typing import Iterator, List, Optional

from .config import settings
from .schemas import LeadIn

SCHEMA = """
CREATE TABLE IF NOT EXISTS leads (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    message    TEXT NOT NULL DEFAULT '',
    company    TEXT,
    project    TEXT,
    budget     TEXT,
    timeline   TEXT,
    plan       TEXT,
    source     TEXT NOT NULL,
    ip         TEXT
);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
"""


@contextmanager
def connect() -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(settings.database_path)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db() -> None:
    with connect() as conn:
        conn.executescript(SCHEMA)


def insert_lead(lead: LeadIn, ip: Optional[str]) -> sqlite3.Row:
    created_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
    with connect() as conn:
        cur = conn.execute(
            """
            INSERT INTO leads
                (created_at, name, email, message, company, project, budget, timeline, plan, source, ip)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                created_at,
                lead.name,
                str(lead.email),
                lead.message,
                lead.company,
                lead.project,
                lead.budget,
                lead.timeline,
                lead.plan,
                lead.source,
                ip,
            ),
        )
        row = conn.execute("SELECT * FROM leads WHERE id = ?", (cur.lastrowid,)).fetchone()
    return row


def list_leads(limit: int = 100, offset: int = 0) -> List[sqlite3.Row]:
    with connect() as conn:
        return conn.execute(
            "SELECT * FROM leads ORDER BY id DESC LIMIT ? OFFSET ?", (limit, offset)
        ).fetchall()
