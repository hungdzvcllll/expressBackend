FROM node:latest
WORKDIR /app

COPY package.json /app
COPY .. /
RUN npm install --omit=dev

CMD ["npm", "start"]
