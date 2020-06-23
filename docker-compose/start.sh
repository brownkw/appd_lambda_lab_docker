#!/usr/bin/env bash

echo "Retrieving controller information..."
AWS_SECRET=$(aws secretsmanager get-secret-value --secret-id aws-sandbox/controller-key | jq -rc '.SecretString | fromjson')
ACCOUNT_NAME=$(echo $AWS_SECRET | jq -rc '.["aws-sandbox-controller-account"]')
ACCESS_KEY=$(echo $AWS_SECRET | jq -rc '.["aws-sandbox-controller-key"]')
UNIQUE_HOST_ID=$(aws ec2 describe-instances --instance-ids $(curl -s http://169.254.169.254/latest/meta-data/instance-id) --output text | grep PRIVATEIPADDRESSES | cut -f3)

echo "Starting application..."
APPDYNAMICS_AGENT_ACCOUNT_NAME=${ACCOUNT_NAME} APPDYNAMICS_AGENT_ACCOUNT_ACCESS_KEY=${ACCESS_KEY} APPDYNAMICS_AGENT_UNIQUE_HOST_ID=${UNIQUE_HOST_ID} docker-compose up -d --build