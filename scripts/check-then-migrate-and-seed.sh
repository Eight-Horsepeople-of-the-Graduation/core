#!/bin/sh


if [ -z "$POSTGRES_USER" ]; then
    echo "Error: POSTGRES_USER is not set."
    exit 1
fi

if [ -z "$POSTGRES_PASSWORD" ]; then
    echo "Error: POSTGRES_PASSWORD is not set."
    exit 1
fi

if [ -z "$POSTGRES_DB" ]; then
    echo "Error: POSTGRES_DB is not set."
    exit 1
fi


# Wait for PostgreSQL to be ready
until pg_isready -h db -U postgres; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Table to check
REFERENCE_TABLE_NAME="Book"

# Check if the table exists
output=$(psql "postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@db/$POSTGRES_DB" -tAc "SELECT COUNT(*) FROM pg_tables WHERE tablename = '$REFERENCE_TABLE_NAME';")

# Command for checking if the working db exists
# output=$(psql "postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@db" -tAc "SELECT COUNT(*) FROM pg_database WHERE datname='$POSTGRES_DB';")


# echo "OUTPUT : '$output'"

if [[ $output -eq 0 ]]; then  # Check if output is equal to 0 (zero rows)
  echo "Tables does not exists. Migrating and seeding..."
  # Run latest migrations
  pnpm prisma:migrate:deploy
  # Run seed
  pnpm prisma:seed
else
  echo "Tables exists. Skipping migrations and seeding..."
fi
