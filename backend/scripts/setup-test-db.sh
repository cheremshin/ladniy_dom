#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname $0)/../.." && pwd)"
BACKEND_DIR="$(cd "$(dirname $0)/.." && pwd)"

echo -e "Запуск PostgreSQL контейнера"
cd "$PROJECT_ROOT"
docker-compose up -d postgres

echo -e "Ожидание готовности PostgreSQL"
sleep 3

echo -e "Создание миграций"
cd "$BACKEND_DIR"
yarn db:generate

echo -e "Применение миграций"
yarn db:migrate

echo -e "Генерация тестовых данных"
yarn ts-node -r tsconfig-paths/register src/database/mocks/generate-test-data.ts

echo -e "Запуск Drizzle Studio"
yarn db:studio
