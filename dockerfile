FROM node:alpine
WORKDIR  /backend/backend-projectmap
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --verbose


# Bundle app source
COPY . .
# Copy the .env file to the container
COPY .env .

CMD [ "npm", "run","start"]