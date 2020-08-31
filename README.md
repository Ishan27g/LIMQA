# ITProject

![CI](https://github.com/Lux040899/LIMQA/workflows/CI/badge.svg)

Main repository for the project.

Steps to run full stack using Docker:

1. verify server/.env is valid and exists before building docker image
2. docker-compose build (first build will take time, subsequent builds should be very quick)
3. docker-compose up

React   : http://localhost:3000
Express : http://localhost:3000
MongoDB : localhost:27017

To only run React Container

1. cd ui/
2. docker build -t react:v1 .
3. docker run -p 3000:3000 react:v1

To only run Express + Mongo Container:

1. cd server
2. docker-compose build (first build will take time, subsequent builds should be very quick)
3. docker-compose up

