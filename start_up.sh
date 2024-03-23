#!/usr/bin/env bash

echo "installing application dependencies..."
cp .env.example .env

docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs

echo "staring sail..."
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate

echo "js building..."
./vendor/bin/sail npm i
./vendor/bin/sail npm run build

echo "migration && seeding db..."
./vendor/bin/sail artisan migrate:fresh
./vendor/bin/sail artisan db:seed --class=AmazonSeeder
./vendor/bin/sail artisan scout:sync-index-settings 
./vendor/bin/sail artisan scout:import "App\Models\Product"

echo "visit http://localhost"
echo "done!"
