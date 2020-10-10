#!/bin/bash
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}"
echo "Stopping all running images"
sudo docker stop $(sudo docker ps -a -q)
echo "Removing all running images"
sudo docker rm $(sudo docker ps -a -q)
echo "Removing all existing docker networks and volume, press 'y'"
sudo docker network prune
sudo docker volume prune
echo -e "${NC}"

sudo docker ps -a
