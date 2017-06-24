#!/bin/bash
# clear the screen
clear
# Start the nodejs server and kill after test are complete
CUR_DIR=$(pwd)
HOST='127.0.0.1'
PORT=2048
SERVER=$CUR_DIR/"server.js"

TIMER=1 ### secs
START=$(date +"%s")
END=$(expr $START + $TIMER)

# Log directory and active logs: Volatile, log files may change.
LOG_DIR=$CUR_DIR/"logs"
ERROR=$LOG_DIR/"error.log"
INFO=$LOG_DIR/"info.log"
DEBUG=$LOG_DIR/"debug.log"

# if a file is open by a process running the comand node is true,
#  inform user to terminate and exit.
if [[ `lsof -c node | grep "$LOG_DIR"` ]]; then
  echo "Logs open by another process.  Please terminate!"
  exit
else
  echo "Clearing logs"
  rm $ERROR $INFO $DEBUG
  touch $ERROR $INFO $DEBUG
fi 

# Start node server
# $! := process id of job most recently placed into the background
# $? := exit status recently executed foreground process
# man bash (search for special parameters)
# start node with server.js and store $! $? output to PROC
#  PROC[0] = $!; PROC[1] = $?
IFS=' ' read -ra PROC < <(exec node $SERVER & echo $! $?)

# give node time to start
TIME=$(date +"%s")
while [ $TIME -lt $END ]; do
  sleep 1
  TIME=$(date +"%s")
done

if [ !${PROC[1]} ]; then
  # status of 0: server started
  echo "Node Server Process ID :=" ${PROC[0]}
else
  exit 
fi

# Check for active connection on port
printf "\nTesting connection\n"
nc -znv $HOST $PORT

# Check for http response
printf "\nRequesting valid response from server\n"
curl $HOST:$PORT -D -
printf "\n"

printf "\nRequesting invalid response from server\n"
curl $HOST:$PORT/bad-request.html -D -
printf "\n"

printf "\nPrinting logs\n"
printf "\nError Log\n"
cat $ERROR

printf "\nInfo Log\n"
cat $INFO

# kill server process
printf "\nKilling Process with ID := %s\n" "${PROC[0]}"
kill ${PROC[0]}
