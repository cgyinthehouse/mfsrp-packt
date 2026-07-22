FROM ghcr.io/pnpm/pnpm:11
ARG VITE_BACKEND_URL=http://localhost:3001/api/v1
RUN pnpm runtime set node 24 -g
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build
CMD ["pnpm", "start"]
