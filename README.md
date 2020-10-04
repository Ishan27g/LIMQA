# ITProject

![CI](https://github.com/Lux040899/LIMQA/workflows/CI/badge.svg)

Main repository for the project.

Steps to run full stack using Docker:
    1.  Verify server/.env is valid and exists before building docker image
    2.  ./startApp.sh -> start/restart ALL services
    3.  ./stopApp.sh -> stop ALL services

    ./restart-express.sh -> restart mongoDB and express container
    ./restaty-ui.sh      -> restart ui container

React   : http://localhost:3000
Express : http://localhost:3000
MongoDB : localhost:27017

