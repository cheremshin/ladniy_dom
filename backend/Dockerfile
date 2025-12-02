FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy root package files for workspace
COPY package.json yarn.lock .yarnrc.yml ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install dependencies
RUN corepack enable && \
    corepack prepare yarn@4.10.3 --activate && \
    yarn install

# Build the application
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarnrc.yml ./
COPY package.json yarn.lock ./
COPY backend ./backend

WORKDIR /app/backend

RUN corepack enable && \
    corepack prepare yarn@4.10.3 --activate && \
    yarn build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/package.json ./package.json

USER nestjs

EXPOSE 3000

CMD ["node", "dist/main"]

