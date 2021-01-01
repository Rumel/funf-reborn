#!/bin/bash
zip -r funf-api.zip .
aws lambda update-function-code --function-name funf-api --zip-file fileb://funf-api.zip
rm funf-api.zip
