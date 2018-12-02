#!/bin/bash

a=1
b=2

if [ $a == $b ]
then
    echo "a 等于 b"
elif [ $a -gt $b ]
then
    echo "a 大于 b"
else
    echo "a 小于b"
fi