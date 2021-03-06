#!/usr/bin/env bash

while true
do
    url_start=("http://localhost:8080/api/login" "http://localhost:8080/api/account")

    job_seeker_urls=("http://localhost:8080/api/search" "http://localhost:8080/api/getJob" "http://localhost:8080/api/submitCandidate")
    job_poster_urls="http://localhost:8080/api/addJob"

    urls=("${url_start[@]}")

    # Randomly toggle between a job searcher and a job poster
    # rnd=$(((RANDOM % 3)+ 1))   
    # i=1  
    # if [ $((rnd)) -gt 1 ]; then
    #     num_times=$(((RANDOM % 5)+ 1))        
    #     while [ $i -le $num_times ]
    #     do
    #         urls+=("${job_seeker_urls[@]}")
    #         i=$((i+1))
    #     done        
    # else
    #     num_times2=$(((RANDOM % 5)+ 1))        
    #     while [ $i -le $num_times2 ]
    #     do
    #         urls+=("$job_poster_urls")
    #         i=$((i+1))
    #     done
    # fi

    i=1
    num_times=$(((RANDOM % 5)+ 1))
    while [ $i -le $num_times ]
    do     
        echo "Adding job seeker $i"   
        urls+=("${job_seeker_urls[@]}")
        i=$((i+1))
    done 

    i=1
    num_times=$(((RANDOM % 5)+ 1))
    while [ $i -le $num_times ]
    do
        echo "Adding job poster $i"
        urls+=("$job_poster_urls")
        i=$((i+1))
    done

    urls+=("http://localhost:3000/api/logout")

    for url in ${urls[@]}
    do      
        echo "curl -s ${url}"  
        echo "$(curl -s ${url})"
        sleep 1
    done    
done