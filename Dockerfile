# syntax=docker/dockerfile:1

FROM node:20.17-bullseye

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
RUN npm -g install pino-pretty

COPY . .

RUN npm run build

EXPOSE 4321

CMD ["npm", "run", "prod"]
