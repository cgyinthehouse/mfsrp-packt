FROM ghcr.io/pnpm/pnpm:11
RUN pnpm runtime set node 20 -g
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build
CMD ["pnpm", "start"]
