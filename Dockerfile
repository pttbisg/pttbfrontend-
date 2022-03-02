# =============================================
# Base image
# =============================================

FROM node:14.15.0-alpine AS base

ENV YARN_CACHE /vendor/yarn

RUN mkdir -p $YARN_CACHE

WORKDIR /vendor

# Cache and install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile --cache-folder $YARN_CACHE

WORKDIR /app

RUN ln -s /vendor/node_modules ./node_modules

# =============================================
# Application image
# =============================================
FROM base AS app

ARG SOURCE_VERSION
ENV SOURCE_VERSION=$SOURCE_VERSION

COPY .env .env

# Copy app files
COPY . .

# Build
RUN yarn build
