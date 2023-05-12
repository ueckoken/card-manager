FROM node:20

WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get upgrade -y
RUN yarn install
COPY . .
RUN yarn prisma:generate
RUN yarn build

CMD [ "yarn", "start" ]
