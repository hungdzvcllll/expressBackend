FROM node:latest AS builder
WORKDIR /app  
COPY package*.json  package-lock.json tsconfig.json /
RUN npm ci --only=production && npm cache clean --force
COPY . .
EXPOSE 8081  
CMD ["npm","start"]