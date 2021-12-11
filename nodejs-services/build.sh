#!/usr/bin/env bash

docker build -t appd_lambda_lab_nodejs_services --build-arg BUILD_ENV=${1:-nocopy} .