FROM node:alpine

# Install PostgreSQL client
RUN apk update && apk add postgresql-client

WORKDIR /app

COPY package.json ./package.json

COPY . .

RUN chmod +x ./scripts/check-then-migrate-and-seed.sh

RUN npm install -g pnpm

RUN pnpm install

CMD ["sh", "-c" ,"./scripts/check-then-migrate-and-seed.sh && pnpm start:dev"]
