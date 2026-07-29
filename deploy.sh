#!/bin/bash
# Деплой на VPS: git pull → зависимости → сборка фронта → рестарт сервисов.
# Запускать на сервере: /opt/ive-studio/deploy.sh
set -e
cd /opt/ive-studio

# git отказывается работать в директории, принадлежащей другому пользователю
# (мы ниже сами меняем владельца на 'ive') — если запускаем не от его имени,
# один раз добавляем исключение, чтобы это не падало каждый раз.
git config --global --get-all safe.directory 2>/dev/null | grep -qx /opt/ive-studio \
  || git config --global --add safe.directory /opt/ive-studio

echo "→ git pull"
git pull

echo "→ backend: зависимости"
cd backend && .venv/bin/pip install -q -r requirements.txt && cd ..

echo "→ frontend: сборка"
cd frontend && npm install --silent && npm run build && cd ..

echo "→ права"
chown -R ive:ive /opt/ive-studio

echo "→ перезапуск бэкенда"
systemctl restart ive-backend

echo "→ nginx reload"
systemctl reload nginx

echo "✓ готово"
systemctl status ive-backend --no-pager -l | head -5
