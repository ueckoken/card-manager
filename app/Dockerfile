FROM node:16-buster-slim

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn prisma:generate
RUN yarn build

CMD [ "yarn", "start" ]