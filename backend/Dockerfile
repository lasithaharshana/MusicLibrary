FROM node:17-alpine

RUN apk add --no-cache python3 make g++

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

EXPOSE 8000

CMD ["npm", "start"]