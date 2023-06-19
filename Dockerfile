FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

COPY .env.development ./

CMD [ "yarn", "start:dev" ]