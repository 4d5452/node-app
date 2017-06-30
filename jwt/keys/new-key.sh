#!/bin/bash
# man ssh-keygen

FILE_NAME=$(pwd)'/rsa-key'
BITS=2048
TYPE='rsa'
PASSPHRASE=''

echo 'Creating rsa key/pair in:' $FILE_NAME

# create the private/public key pair
ssh-keygen -t $TYPE -b $BITS -f $FILE_NAME -N ''

# create public PEM
ssh-keygen -f $FILE_NAME.pub -e -m PEM > $FILE_NAME.pem.pub
