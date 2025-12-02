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
COPY frontend ./frontend

WORKDIR /app/frontend

ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable && \
    corepack prepare yarn@4.10.3 --activate && \
    yarn build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output - Next.js creates server.js in .next/standalone/frontend/
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./.next/static
RUN mkdir -p ./public
COPY --from=builder --chown=nextjs:nodejs /app/frontend/public ./public

USER nextjs

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# Next.js standalone создает server.js в поддиректории с именем проекта
CMD ["node", "frontend/server.js"]

