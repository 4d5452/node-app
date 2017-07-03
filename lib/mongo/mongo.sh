#!/bin/bash

START=0
STOP=0
RESET=0
COUNT=0
STARTED=$(service mongod status | grep -e "Active: active")
HELP=0
VERBOSE=0
MONGO_LOG=/var/log/mongodb/mongod.log
MONGO_CONFIG=/etc/mongod.conf
PORT=$(grep -e "port:.*" < $MONGO_CONFIG | awk '{ print $2; }')

# collect and evaluate args: Thank you Ponyboy47
#   <https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash>
while [[ $# -gt 0 ]]; do
  key="$1"
  case "$key" in 
    --start)
      START=1
      ((COUNT++))
      ;;
    --stop)
      STOP=1
      ((COUNT++))
      ;;
    --reset)
      RESET=1
      ((COUNT++))
      ;;
    -v|--verbose)
      VERBOSE=1
      ;;
    *)
      echo "Unknown option '$key'"
      HELP=1
      ;;
  esac
  # Shift after checking all the cases to get the next oprtion
  shift
done

print_help () {
  echo "Provide ONE of the following commands";
  echo "--start := start the mongo service";
  echo "--stop := stop the mongo service";
  echo "--reset := reset the mongo service";
  echo "Optional arguments";
  echo "-v | --verbose := print mongo service status"
}

# catch misuse of args
if [ "$COUNT" -ne 1 ]; then
  print_help
  exit 1
fi

if [ "$HELP" -eq 1 ]; then
  print_help
  exit 0
fi

if [ "$START" -eq 1 ]; then
  # make sure mongo isnt started
  if [ -n "$STARTED" ]; then
    # length is not-zero: service already started
    echo "Error: mongo is currently running."
    exit 1
  fi
  # start the mongo service
  sudo service mongod start
fi

if [ "$STOP" -eq 1 ]; then
  # is mongo running?
  if [ -z "$STARTED" ]; then
    # length is zero: service is not started
    echo "Error: mongo is not running."
    exit 1
  fi
  sudo service mongod stop
fi

if [ "$RESET" -eq 1 ]; then
  # is mongo running
  if [ -z "$STARTED" ]; then
    # length is zero: service is not running
    echo "Error: mongo is not running."
    exit 1
  fi
  sudo service mongod restart
fi

if [ "$VERBOSE" -eq 1 ]; then
  # show server status
  service mongod status
fi

exit 0
