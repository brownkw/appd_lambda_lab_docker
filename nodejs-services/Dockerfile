FROM node:12-slim

RUN mkdir -p /src
COPY src /src

WORKDIR /src

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]