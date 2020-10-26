#!/bin/bash
GREEN='\033[0;32m'
NC='\033[0m'

SERVER_DIR=server/

docker ps -a  | grep 'mongodb'
if [ $? -eq 0 ]; then
    echo -e "${GREEN}"
    echo "Stopping mongodb"
    docker stop mongodb
    echo "Removing mongodb"
    docker rm mongodb
    echo -e "${NC}"
else
    echo "mongodb is not running"
    exit 1
fi

docker ps -a  | grep 'node-express'
if [ $? -eq 0 ]; then
    echo -e "${GREEN}"
    echo "Stopping node-express"
    docker stop node-express
    echo "Removing node-express"
    docker rm node-express
    echo -e "${NC}"
else
    echo "node-express is not running"
    exit 1
fi

#from server/ directory, start server container
echo -e "${GREEN}"
echo "Starting Express Server"
echo -e "${NC}"
cd $SERVER_DIR
docker-compose up --build --detach
cd ..

echo -e "${GREEN}"
echo "Following containers are now running ->"
docker ps -a --format '{{.Names}}'
echo ""
echo "To see the logs for a container, add 'container's name' from above to the following command ->"
echo "docker logs -f -t 'container's name'"
echo ""
echo -e "${NC}"
