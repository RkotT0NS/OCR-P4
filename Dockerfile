# Stage 1: Base - Common dependencies for both environments
FROM php:8.4-fpm AS base

# Install common system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    nodejs \
    npm \
    unzip \
    git \
    libfreetype-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install pdo zip bcmath

# Install required Redis and XDebug extensions
RUN pecl channel-update pecl.php.net && \
    pecl install xdebug-3.4.0 && docker-php-ext-enable xdebug && \
    pecl install redis && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Stage 2: PGSQL - Adds PostgreSQL support
FROM base AS pgsql
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql

# Stage 3: SQLite - Adds SQLite support
FROM base AS sqlite
RUN apt-get update && apt-get install -y libsqlite3-dev \
    && docker-php-ext-install pdo_sqlite
