import logging
import smtplib
from email.message import EmailMessage

from .config import settings
from .schemas import LeadIn

log = logging.getLogger("ive.mailer")


def send_lead_notification(lead: LeadIn, lead_id: int) -> None:
    """Письмо на почту о новой заявке. Если SMTP не настроен или упал —
    просто пишем в лог: заявка уже сохранена в базе, это не должно ронять запрос."""
    if not settings.smtp_user or not settings.smtp_password:
        return

    to_addr = settings.notify_email or settings.smtp_user

    msg = EmailMessage()
    msg["Subject"] = f"IVE studio — новая заявка #{lead_id} ({lead.source})"
    msg["From"] = settings.smtp_user
    msg["To"] = to_addr
    msg["Reply-To"] = str(lead.email)

    lines = [
        f"Имя: {lead.name}",
        f"Email: {lead.email}",
        f"Источник: {lead.source}",
    ]
    if lead.company:
        lines.append(f"Компания: {lead.company}")
    if lead.project:
        lines.append(f"Проект: {lead.project}")
    if lead.budget:
        lines.append(f"Бюджет: {lead.budget}")
    if lead.timeline:
        lines.append(f"Сроки: {lead.timeline}")
    if lead.plan:
        lines.append(f"Пакет: {lead.plan}")
    lines.append("")
    lines.append("Сообщение:")
    lines.append(lead.message or "(без сообщения)")

    msg.set_content("\n".join(lines))

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as server:
            server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(msg)
        log.info("notification sent for lead #%s", lead_id)
    except Exception:
        log.exception("failed to send notification for lead #%s", lead_id)
