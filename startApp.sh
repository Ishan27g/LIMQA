#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m'
SERVER_DIR=server/
DATABASE_DIR=data_db
if [ ! -d "DATABASE_DIR" ]; then
    echo -e "${GREEN}"
    echo "Mounting local volume for MongoDB"
    echo -e "${NC}"
    mkdir $DATABASE_DIR
    sudo docker volume create --name=$DATABASE_DIR
    cd $SERVER_DIR
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