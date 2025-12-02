# Ладный Дом - Интернет-магазин бытовой электроники

Курсовой проект: интернет-магазин бытовой электроники.

## Технологический стек

### Backend
- **NestJS** - фреймворк для Node.js
- **TypeScript** - язык программирования
- **DrizzleORM** - ORM для работы с базой данных
- **PostgreSQL** - система управления базами данных
- **GraphQL** - язык запросов для API
- **Apollo Server** - GraphQL сервер
- **Architecture**: DDD (Domain-Driven Design) со слоями:
  - Domain - бизнес-логика
  - Infrastructure - работа с БД, внешние сервисы
  - Presentation - GraphQL резолверы и контроллеры

### Frontend
- **Next.js 16** - React фреймворк с App Router
- **React Compiler** - экспериментальная функция для оптимизации
- **TypeScript** - язык программирования
- **Apollo Client** - GraphQL клиент
- **Architecture**: FSD (Feature-Sliced Design)

### DevOps
- **Docker** - контейнеризация приложений
- **Docker Compose** - оркестрация контейнеров
- **Yarn 4** - пакетный менеджер

## Запуск проекта

### Предварительные требования
- Docker
- Docker Compose
- Yarn 4

### Запуск всего окружения одной командой

```bash
docker-compose up --build
```

После запуска:
- Frontend будет доступен по адресу: http://localhost:3001
- Backend GraphQL API: http://localhost:3000/graphql
- PostgreSQL: localhost:5432

### Локальная разработка

Порты настроены так, чтобы не конфликтовать:
- **Backend**: порт 3000 (можно изменить через переменную окружения `PORT`)
- **Frontend**: порт 3001 (настроен в `package.json`)

#### Backend

```bash
cd backend
yarn install
yarn start:dev
```

Backend запустится на порту 3000 (или на порту, указанном в переменной окружения `PORT`).

#### Frontend

```bash
cd frontend
yarn install
yarn dev
```

Frontend запустится на порту 3001.

### Переменные окружения

Backend использует следующие переменные окружения (см. `backend/.env.example`):
- `PORT` - порт для запуска приложения (по умолчанию 3000)
- `DB_HOST` - хост базы данных
- `DB_PORT` - порт базы данных
- `DB_USER` - пользователь базы данных
- `DB_PASSWORD` - пароль базы данных
- `DB_NAME` - имя базы данных

Frontend использует следующие переменные окружения (см. `frontend/.env.example`):
- `PORT` - порт для запуска приложения (по умолчанию 3001, настроен в package.json)
- `NEXT_PUBLIC_API_URL` - URL GraphQL API (по умолчанию http://localhost:3000/graphql)

## Особенности проекта

1. **ORM**: DrizzleORM используется для всех операций с базой данных
2. **PostgreSQL**: База данных создается и модифицируется напрямую через ORM (без отдельных SQL скриптов)
3. **GraphQL**: Вся коммуникация между frontend и backend осуществляется через GraphQL
4. **Docker**: Оба приложения упакованы в Docker-контейнеры
5. **Yarn Workspaces**: Монорепозиторий с использованием Yarn 4
