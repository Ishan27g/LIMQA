#!/bin/bash
now=$(date +"%T")
echo "------------------------------------------------------" >> /home/limqa/deploy/cronLogs.txt
echo "Current time : $now" >> /home/limqa/deploy/cronLogs.txt 
git checkout LIVE >> /home/limqa/deploy/cronLogs.txt
if [ "$(git pull)" == "Already up to date." ];
then 	
	echo "Already up to date." >> /home/limqa/deploy/cronLogs.txt
else
	echo "Restarting App " >> /home/limqa/deploy/cronLogs.txt
	./restart-ui.sh && ./restart-express.sh
fi

