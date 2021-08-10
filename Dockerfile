FROM mongo:latest
RUN mkdir /log
RUN touch /log/mongodb.log
RUN mongod --bind_ip_all --logpath /log/mongodb.log --fork

FROM node:14.17
COPY . ./projmural
WORKDIR /projmural
RUN apt-get update
RUN apt-get install git
RUN npm install
RUN npm run build
CMD node ./server.js