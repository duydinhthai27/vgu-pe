FROM node:14

WORKDIR /library-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start
