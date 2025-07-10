FROM node:latest

WORKDIR /frontend

COPY package.json package-lock.json .
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
