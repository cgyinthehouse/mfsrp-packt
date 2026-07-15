FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
RUN pnpm install
COPY . .
CMD ["pnpm", "start"]
