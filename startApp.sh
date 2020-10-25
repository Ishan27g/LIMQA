#!/bin/bash


SERVER_DIR=server/
DB_DIR=MongoDB/
PERSISTENT_DIR=mongodata
UPLOADS_DIR=uploads

sudo rm -rf .sslCerts
sudo rm -rf server/.sslCerts
cd ..
./installCert.sh
cd -

echo ""
echo "CREATING A FRESH DATABASE, ctrl + c to exit now"
sleep 6
echo ""
rm -rf server/MongoDB
rm -rf server/uploads
echo "Stopping all apps"
./stopApp.sh

cd $SERVER_DIR
if [ ! -d "$DB_DIR" ]; then
    mkdir $DB_DIR
fi
if [ ! -d "$DB_DIR$PERSISTENT_DIR" ]; then
    echo "Mounting local volume for MongoDB"
    cd $DB_DIR
    mkdir $PERSISTENT_DIR
    docker volume create --name=$PERSISTENT_DIR
    cd ..
    echo "Mounting uploads/ directory for File uploads"
    mkdir $UPLOADS_DIR
    cd $UPLOADS_DIR
    mkdir images
    cd ..
    docker volume create --name=$UPLOADS_DIR
    #rm .env
    #echo "MONGO_HOSTNAME=mongo
#MONGO_DB=app_db
#MONGO_PORT=27017" >> .env
fi

#from server/ directory, start container
echo "Starting MONGO DB and Express Server"
docker-compose up --build --detach

cd ..

#from root directory, start ui container
echo "Starting React"
docker-compose up --build --detach

echo "Following containers are now running ->"
docker ps -a --format '{{.Names}}'
echo ""
echo "To see the logs for a container, add 'container's name' from above to the following command ->"
echo ""
echo "docker logs -f -t 'container's name'"
