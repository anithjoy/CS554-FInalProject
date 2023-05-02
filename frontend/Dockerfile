FROM node:18-alpine

RUN mkdir -p /usr/src/app/

ADD . /usr/src/app/
WORKDIR /usr/src/app/
RUN npm i

EXPOSE 3003

CMD [ "npm", "run", "dev"]
