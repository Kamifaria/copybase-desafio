FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm --prefix copybase-backend run build
ENTRYPOINT ["/bin/sh", "-c", "npm --prefix copybase-backend run start"]