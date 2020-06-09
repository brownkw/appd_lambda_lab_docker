#!/usr/bin/env bash

echo "Retrieving controller information..."
AWS_SECRET=$(aws secretsmanager get-secret-value --secret-id aws-sandbox/controller-key | jq -rc '.SecretString | fromjson')
ACCOUNT_NAME=$(echo $AWS_SECRET | jq -rc '.["aws-sandbox-controller-account"]')
ACCESS_KEY=$(echo $AWS_SECRET | jq -rc '.["aws-sandbox-controller-key"]')

echo "Starting application..."
APPDYNAMICS_AGENT_ACCOUNT_NAME=${ACCOUNT_NAME} APPDYNAMICS_AGENT_ACCOUNT_ACCESS_KEY=${ACCESS_KEY} docker-compose up -d --build