FROM node:10.23-alpine
# Create app directory
RUN mkdir -p /usr/src/uploads
WORKDIR /usr/src/app/
# Install app dependencies
COPY package*.json ./

RUN CI=true

RUN npm install 
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]
