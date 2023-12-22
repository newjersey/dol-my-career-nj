#!/usr/bin/env bash

cd $(git rev-parse --show-toplevel)
echo "DB_ENV is set to: $DB_ENV"
APP_PORT=8080

# Kill any process using the app port

set -e

echo "Starting app..."
./scripts/build.sh
./scripts/prod-start-local.sh & # Start the app in the background

echo "Waiting for app to start..."
while ! nc -z localhost ${APP_PORT}; do
  sleep 1 # wait for 1 second before check again
done

echo "App started"

# Print that migration is starting
echo "Starting DB migration..."

# Run the migration and capture output to a temporary file
npm run db-migrate up -- -e $DB_ENV &> temp_migration_output.txt

# Extract the second to last line and get the migration name
MIGRATION_NAME=$(tail -2 temp_migration_output.txt | head -1 | grep -oP '(?<=Processed migration ).*')

# Print the name of the migration
echo "Last migration: $MIGRATION_NAME"

echo "DB migration completed"

echo "Running Cypress tests..."
npm --prefix=frontend run cypress:run -- --config baseUrl=http://localhost:${APP_PORT}

echo "Cypress tests completed"
set +e

# Clean up
kill $(lsof -i:${APP_PORT} -t)

echo "App stopped"

echo "   __            _                                             _"
echo "  / _| ___  __ _| |_ _   _ _ __ ___  ___   _ __   __ _ ___ ___| |"
echo " | |_ / _ \/ _\` | __| | | | '__/ _ \/ __| | '_ \ / _\` / __/ __| |"
echo " |  _|  __/ (_| | |_| |_| | | |  __/\__ \ | |_) | (_| \__ \__ \_|"
echo " |_|  \___|\__,_|\__|\__,_|_|  \___||___/ | .__/ \__,_|___/___(_)"
echo "                                          |_|                    "
echo ""