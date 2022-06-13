FROM node:14.17
COPY . /projmural
WORKDIR /projmural
RUN npm install && npm run build
EXPOSE 3000
CMD npm run start:client