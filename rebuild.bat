@echo off
echo === Parando containers antigos ===
docker-compose down -v

echo === Limpando cache e volumes ===
docker system prune -f

echo === Rebuild completo do projeto ===
docker-compose up --build