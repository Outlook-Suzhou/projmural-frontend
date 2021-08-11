FROM node:14.17
COPY . ./projmural
WORKDIR /projmural
RUN apt-get update
RUN apt-get install git
RUN npm install
RUN npm install pm2 -g
RUN npm run build
CMD ["pm2-runtime", "./server.js"]
