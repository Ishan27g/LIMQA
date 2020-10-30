#  Dockerfile for Node Express Backend api 
FROM node:10.23-alpine

# ARG NODE_ENV=development
# Create App Directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/uploads
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm i nodemailer
RUN npm install https
RUN npm i

# Copy app source code
COPY . .

# Exports
EXPOSE 8080

CMD ["npm","start"]
