#!/usr/bin/env bash

dockerize -wait tcp://core-services:8080 -wait tcp://mongo-accounts:27017 -wait tcp://mongo-sessions:27017 -timeout 300s

urls=("http://web-api:3000/api/login" "http://web-api:3000/api/about" "http://web-api:3000/api/search" "http://web-api:3000/api/logout")

while true
do
    for url in ${urls[@]}; do
        echo $(curl -s $url)
        sleep 1
    done    
done