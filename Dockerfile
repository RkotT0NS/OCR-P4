FROM php:8.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    nodejs \
    npm \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql zip bcmath

# Install required Redis and XDedug extension
RUN pecl channel-update pecl.php.net && \
    pecl install xdebug-3.4.0 && docker-php-ext-enable xdebug && \
    pecl install redis && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
