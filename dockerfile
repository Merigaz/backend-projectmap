# Use the official Node.js image as the base image
FROM node:16-alpine

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .
# Copy the .env file to the container
COPY .env .

CMD [ "npm", "run","start"]