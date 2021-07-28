FROM node:14.17
COPY . ./demo
WORKDIR /demo
RUN apt-get update
RUN apt-get install git
RUN npm install