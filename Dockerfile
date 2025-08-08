FROM node:14-alpine AS node_base

FROM node_base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node_base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN npm run build

FROM nginx:1.16-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["sh", "-c", "nginx -g \"daemon off;\""]
