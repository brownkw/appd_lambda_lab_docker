FROM node:12-slim

RUN mkdir -p /src
COPY src/package.json /src/package.json
WORKDIR /src

RUN npm install
COPY src /src

EXPOSE 3000

CMD [ "npm", "start" ]