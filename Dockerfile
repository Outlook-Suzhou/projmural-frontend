FROM node:14.17
COPY ./server ./projmural
WORKDIR /projmural
CMD ["node", "./server.js"]