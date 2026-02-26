FROM node:latest
WORKDIR /app

COPY package.json /app
COPY .. /
RUN npm install
RUN npm build --omit=dev

CMD ["npm", "start"]
