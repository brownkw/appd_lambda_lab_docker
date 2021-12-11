ARG BUILD_ENV=nocopy

FROM node:12-slim AS build_copy
ONBUILD RUN echo "Copying graph.json"
ONBUILD COPY graph.json /graph.json

FROM node:12-slim AS build_nocopy
ONBUILD RUN echo "Not copying graph.json"

FROM build_${BUILD_ENV}

RUN mkdir -p /src
COPY src/package.json /src/package.json
WORKDIR /src

RUN npm install
COPY src /src

EXPOSE 3000

CMD [ "npm", "start" ]