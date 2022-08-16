
FROM node:14-slim

WORKDIR '/erp-test'

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]