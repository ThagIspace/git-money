# Dockerfile cho frontend
FROM node:20

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "-s", "build", "-l", "3000"]
