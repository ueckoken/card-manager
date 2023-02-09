FROM node:19

WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get upgrade -y
RUN yarn install
COPY . .
RUN yarn prisma:generate
RUN yarn build

CMD [ "yarn", "start" ]