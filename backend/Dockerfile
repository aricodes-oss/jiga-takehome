FROM node:latest

WORKDIR /backend

COPY package.json package-lock.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
