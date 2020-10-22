#!/bin/bash
now=$(date +"%T")
git checkout LIVE #>> /home/limqa/deploy/cronLogs.txt
if [ ! "$(git pull origin LIVE)" == "Already up to date." ];
then
	echo "------------------------------------------------------" >> /home/limqa/deploy/cronLogs.txt
	echo "Current time : $now" >> /home/limqa/deploy/cronLogs.txt 
	echo "Deploying new version... " >> /home/limqa/deploy/cronLogs.txt
	./restart-ui.sh && ./restart-express.sh
fi

RUNNING=$(sudo docker ps -q | wc -l)
if [ $RUNNING -eq 0 ]
then
	./restart-ui.sh && ./restart-express.sh
fi
