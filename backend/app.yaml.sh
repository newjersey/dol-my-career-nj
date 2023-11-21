#!/bin/bash
echo """
runtime: nodejs18
resources:
  cpu: 2
  memory_gb: 8
env_variables:
  DB_USER: postgres
  DB_PASS: \"$DB_PASS\"
  DB_NAME: \"$DB_NAME\"
  DB_ENV: \"$DB_ENV\"
  CLOUD_SQL_CONNECTION_NAME: \"$CLOUD_SQL_CONNECTION_NAME\"
  ONET_BASEURL: \"$ONET_BASEURL\"
  ONET_USERNAME: \"$ONET_USERNAME\"
  ONET_PASSWORD: \"$ONET_PASSWORD\"
  CAREER_ONESTOP_BASEURL: \"$CAREER_ONESTOP_BASEURL\"
  CAREER_ONESTOP_USERID: \"$CAREER_ONESTOP_USERID\"
  CAREER_ONESTOP_AUTH_TOKEN: \"$CAREER_ONESTOP_AUTH_TOKEN\"
  BASE_URL: \"$BASE_URL\"
  SPACE_ID: \"$SPACE_ID\"
  DELIVERY_API: \"$DELIVERY_API\"
  SENTRY_DSN: \"$SENTRY_DSN\"
  NODE_OPTIONS: --max_old_space_size=4096
handlers:
- url: /(.*)
  script: auto
  secure: always
  redirect_http_response_code: 301
  redirect_matcher:
    regex: .*
    location: https://mycareer.nj.gov/training/\1
"""
