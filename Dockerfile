FROM node:14-alpine

WORKDIR /react-covid-tracker
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["yarn", "start"]