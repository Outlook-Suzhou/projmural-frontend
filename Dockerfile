FROM node:14.17
COPY . ./projmural
WORKDIR /projmural
RUN apt-get update
RUN apt-get install git
RUN npm install
CMD npm run start