FROM node:22-alpine AS base

ARG BUILD_DATE
ARG BUILD_BRANCH
ARG BUILD_SHA

ENV LANG=en_US.UTF-8

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
COPY ./tsconfig.json /app/tsconfig.json
COPY ./next.config.ts /app/next.config.ts
COPY ./tailwind.config.js /app/tailwind.config.js
COPY ./postcss.config.mjs /app/postcss.config.mjs 
COPY ./src /app/src
# postcss.config.mjs一定要加，不然就沒CSS

RUN corepack enable && \
    yarn set version 4.8.1 && \
    yarn install

EXPOSE 3000
CMD ["yarn", "dev"]