FROM node:alpine

WORKDIR /app


COPY package*.json ./

COPY . .

RUN npm install pm2@latest -g

RUN npm install

RUN npm run build

EXPOSE 3000

# Launch app with PM2
CMD [ "pm2-runtime", "start", "docker/ecosystem.config.js", "npm", "--", "start" ]