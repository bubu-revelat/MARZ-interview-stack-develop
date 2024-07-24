FROM node:14

WORKDIR /api.products

COPY package.json .
RUN npm install
COPY . .
EXPOSE 5002
CMD ["node", "index.js"]