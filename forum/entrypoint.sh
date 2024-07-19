#!/bin/bash
set -e

# Wait for PostgreSQL to be ready
./wait-for-it.sh db:5432 --timeout=60 --strict -- echo "Database is up"

# Run database migrations
yarn prisma db push

# Start the application
yarn dev
