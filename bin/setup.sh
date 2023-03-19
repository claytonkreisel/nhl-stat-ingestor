#!/bin/bash

MODULES_DIR=/node_modules
if [ ! -d "$MODULES_DIR" ]; then
    echo "Installing dependencies..."
    yarn
else
    echo "Modules folder already exists!"
fi

DB_FILE=prisma/nhl-stats.sqlite
if [ ! -f "$DB_FILE" ]; then
    echo "Creating DB..."
    yarn prisma migrate dev --name init 
else
    echo "DB already exists at "$DB_FILE""
fi