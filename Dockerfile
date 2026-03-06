FROM node:latest
WORKDIR /app

COPY package.json /app
COPY .. /app
RUN apt-get install -y \
  nodejs
CMD ["npm", ,"start"]
