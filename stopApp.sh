#!/bin/bash
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}"
echo "Stopping all running images"
docker stop $(docker ps -a -q)
echo "Removing all running images"
docker rm $(docker ps -a -q)
echo "Removing all existing docker networks and volume, press 'y'"
docker network prune
docker volume prune
echo -e "${NC}"

docker ps -a
