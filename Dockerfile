FROM node:14.17
COPY . /projmural
WORKDIR /projmural
RUN npm install
EXPOSE 3000
CMD npm run start
