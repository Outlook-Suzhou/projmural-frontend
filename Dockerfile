FROM node:14.17
ENV NODE_ENV=production
COPY . ./projmural
WORKDIR /projmural
RUN apt-get update
RUN apt-get install git
RUN npm install
RUN npm install pm2 -g
RUN npm run build
ENV PM2_PUBLIC_KEY a4v373c20sxo6g3
ENV PM2_SECRET_KEY vfl0e8fbnfwrud2
CMD ["pm2-runtime", "./server.js"]
