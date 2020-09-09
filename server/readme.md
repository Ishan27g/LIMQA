.env file

MONGO_HOSTNAME=mongo (if running in docker)
MONGO_HOSTNAME=localhost (if running locally)
MONGO_DB=app_db
MONGO_PORT=27017

mkdir data_db
sudo docker volume create --name=data_db
