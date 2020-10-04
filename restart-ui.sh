#!/bin/bash
GREEN='\033[0;32m'
NC='\033[0m'

sudo docker ps -a  | grep 'react-ui'
if [ $? -eq 0 ]; then
    echo -e "${GREEN}"
    echo "Stopping react-ui"
    sudo docker stop react-ui
    echo "Removing react-ui"
    sudo docker rm react-ui
    echo -e "${NC}"
else
    echo "react-ui is not running"
    exit 1
fi

#from root directory, start ui container
echo -e "${GREEN}"
echo "Starting React"
echo -e "${NC}"
sudo docker-compose up --build --detach

echo -e "${GREEN}"
echo "Following containers are now running ->"
sudo docker ps -a --format '{{.Names}}'
echo ""
echo "To see the logs for a container, add 'container's name' from above to the following command ->"
echo "sudo docker logs -f -t 'container's name'"
echo ""
echo -e "${NC}"
