FROM node:carbon-alpine

# create app directory
WORKDIR /app

# install app dependencies
COPY package.json ./
RUN npm install

# copy app source
COPY . .

CMD [ "npm", "start" ]