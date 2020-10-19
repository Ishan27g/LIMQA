echo "Following containers are now running ->"
docker ps -a --format '{{.Names}}'
echo "To see the logs for a container, add 'container's name' from above to the following command ->"
echo "docker logs -f -t 'container's name'"
read -rsp $'\nPress ANY key to continue...\n' -n1 key