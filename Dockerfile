FROM ghcr.io/pnpm/pnpm:11 AS build
ARG VITE_BACKEND_URL=http://localhost:3001/api/v1
RUN pnpm runtime set node 20 -g
WORKDIR /build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx AS final
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist .
