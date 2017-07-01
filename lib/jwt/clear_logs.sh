#!/bin/bash

LOG_DIR=$(pwd)/logs
ERROR=$LOG_DIR/error.log
INFO=$LOG_DIR/info.log
DEBUG=$LOG_DIR/debug.log

#  inform user to terminate and exit.
if [[ `lsof -c node | grep "$LOG_DIR"` ]]; then
  echo "Logs open by another process.  Please terminate!"
  exit
else
  echo "Clearing logs"
  rm $ERROR $INFO $DEBUG
  touch $ERROR $INFO $DEBUG
fi
