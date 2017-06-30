#!/bin/bash

LOG_DIR=$(pwd)/logs
ERROR=$LOG_DIR/error.log
INFO=$LOG_DIR/info.log

printf "\nError Log\n"
cat $ERROR

printf "\nInfo Log\n"
cat $INFO
