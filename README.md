# ITProject

![CI](https://github.com/Lux040899/LIMQA/workflows/CI/badge.svg)

Main repository for the project.

## Steps to run full stack using Docker:
    
    1.  Verify server/.env is valid and exists before building docker image
    2.  `./startApp.sh`         -> start/restart ALL services
    3.  `./stopApp.sh`          -> stop ALL services
    4.  `./restart-express.sh`  -> restart mongoDB and express container
    5.  `./restart-ui.sh`       -> restart ui container
