# Etapa 1: Build de dependencias PHP y Node.js
FROM php:8.2-fpm AS build

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    git curl unzip zip libpng-dev libonig-dev libxml2-dev libzip-dev \
    npm nodejs gnupg2 ca-certificates libpq-dev libsqlite3-dev \
    && docker-php-ext-install pdo pdo_mysql zip mbstring exif pcntl

# Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Setea el directorio de trabajo
WORKDIR /var/www

# Copia archivos del proyecto
COPY . .

# Instala dependencias de PHP
RUN composer install --no-dev --optimize-autoloader

# Instala dependencias de Node y compila assets
RUN npm install && npm run build

# Etapa 2: Imagen final
FROM php:8.2-cli

WORKDIR /var/www

# Instala dependencias mínimas para ejecución
RUN apt-get update && apt-get install -y libzip-dev zip unzip libpng-dev libonig-dev libxml2-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql zip mbstring exif pcntl

# Copia Composer desde build
COPY --from=build /usr/bin/composer /usr/bin/composer

# Copia todo el proyecto y assets ya compilados
COPY --from=build /var/www /var/www

# Exponer puerto 8000 (por defecto con artisan serve)
EXPOSE ${PORT:-8000}

# Comando para iniciar Laravel
CMD sh -c "mkdir -p storage/logs && touch storage/logs/laravel.log && php artisan config:cache && tail -n 50 -f storage/logs/laravel.log & php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"
