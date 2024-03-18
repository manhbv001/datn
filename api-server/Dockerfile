FROM node:18-alpine

WORKDIR /usr/techomies/api

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

