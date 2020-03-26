FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

Expose 3000

CMD [ "npm" , "start" ]
