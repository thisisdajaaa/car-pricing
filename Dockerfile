# Installing dependencies:
FROM node:18-alpine AS install-dependencies

WORKDIR /user/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .


# Creating a build:
FROM node:18-alpine AS create-build

WORKDIR /user/src/app

COPY --from=install-dependencies /user/src/app ./

RUN yarn build


# Running the application:
FROM node:18-alpine AS run

WORKDIR /user/src/app

COPY --from=create-build /user/src/app/dist ./dist

COPY --from=install-dependencies /user/src/app/node_modules ./node_modules

COPY package.json ./

RUN yarn install --production

CMD ["yarn", "start:prod"]
