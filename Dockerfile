FROM node:14.17
COPY . ./projmural
WORKDIR /projmural
CMD ["pm2-runtime", "./server/server.js"]
