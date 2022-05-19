# Use small base image with nodejs 10
FROM node:10.13-alpine

WORKDIR /usr/src/app

# Copy package.json, packge-lock.json into current dir
COPY ["package.json", "package-lock.json*", "./"]

# install dependencies
RUN npm i

# copy sources
COPY . .

# open default port
EXPOSE 3000

# Run app
CMD ["npm", "run", "start:dev"]
