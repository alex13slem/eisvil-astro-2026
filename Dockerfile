FROM node:20-bookworm AS build
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

ARG DIRECTUS_URL
ARG DIRECTUS_DATABASE_URL
ENV DIRECTUS_URL=$DIRECTUS_URL
ENV DIRECTUS_DATABASE_URL=$DIRECTUS_DATABASE_URL

COPY . .
RUN pnpm build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
