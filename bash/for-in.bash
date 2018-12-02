#!/bin/bash

for index in 1 2 3 4 5; do
    echo "index=$index"
done

for ((i=0; i<5; i++)); do
    echo "i="$i
done

int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
