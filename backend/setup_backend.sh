#!/bin/bash

echo "Install the requirements...."

docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php84-composer:latest install


echo "Run the container..."
./vendor/bin/sail up -d

echo "Key generate..."

./vendor/bin/sail artisan key:generate

echo "Run the migrations..."

./vendor/bin/sail artisan migrate

echo "Server is running on http://localhost..."
