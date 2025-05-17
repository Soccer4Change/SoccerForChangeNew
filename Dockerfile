FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 8080

USER node

CMD ["node", "server.js"]