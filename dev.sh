#!/usr/bin/env bash
echo "staring sail..."
./vendor/bin/sail up -d

echo "js building..."
./vendor/bin/sail npm i
./vendor/bin/sail npm run build
