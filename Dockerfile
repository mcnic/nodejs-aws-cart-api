FROM node:20-alpine AS base

FROM base AS install-dev
WORKDIR /tmp/dev
COPY package*.json ./
RUN npm ci

FROM base AS install-prod
WORKDIR /tmp/prod
COPY package*.json ./
RUN npm ci --omit dev

FROM install-dev AS prisma
COPY prisma ./prisma
RUN npm run db:generate

FROM prisma AS build
ENV NODE_ENV=production
COPY tsconfig* webpack.config.js ./
COPY src ./src
RUN npm run build

FROM base
WORKDIR /app
COPY --from=install-prod /tmp/prod/node_modules/@prisma ./node_modules/@prisma/
COPY --from=install-prod /tmp/prod/node_modules/prisma ./node_modules/prisma/
COPY --from=install-prod /tmp/prod/node_modules/.bin ./node_modules/.bin/

COPY --from=build /tmp/dev/node_modules/.prisma ./node_modules/.prisma/
COPY --from=build /tmp/dev/prisma ./prisma/

COPY --from=build /tmp/dev/dist/main.js ./dist/
COPY --from=build /tmp/dev/dist/seed.js ./dist/
COPY --from=build /tmp/dev/package.json ./

EXPOSE 4000
CMD ["dist/main.js"]