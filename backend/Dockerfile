FROM node:22-alpine AS base

ARG BUILD_DATE
ARG BUILD_BRANCH
ARG BUILD_SHA

ENV LANG=en_US.UTF-8

WORKDIR /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
COPY ./tsconfig.json /app/tsconfig.json
COPY ./.yarnrc.yml /app/.yarnrc.yml
COPY ./prisma /app/prisma
COPY ./src /app/src

RUN apk add --no-cache netcat-openbsd && \
    corepack enable && \
    yarn set version 4.8.1 && \
    yarn install

EXPOSE 4000
