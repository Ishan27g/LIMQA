#!/bin/bash
GREEN='\033[0;32m'
NC='\033[0m'

SERVER_DIR=server/
DATABASE_DIR=data_db
UPLOADS_DIR=uploads

if [ ! -d "$SERVER_DIR$DATABASE_DIR" ]; then
    echo -e "${GREEN}"
    echo "Mounting local volume for MongoDB"
    echo -e "${NC}"
    cd $SERVER_DIR
    mkdir $DATABASE_DIR
    sudo docker volume create --name=$DATABASE_DIR
    echo -e "${GREEN}"
    echo "Mounting uploads directory for File uploads"
    echo -e "${NC}"
    sudo docker volume create --name=$UPLOADS_DIR
    rm .env
    echo "MONGO_HOSTNAME=mongo
MONGO_DB=app_db
MONGO_PORT=27017" >> .env
    cd ..
fi
echo -e "${GREEN}"
echo "Starting App"
echo -e "${NC}"
sudo docker-compose up --build