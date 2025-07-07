FROM php:7.4-apache

# Instala extensões
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Habilita .htaccess e mod_rewrite
RUN a2enmod rewrite
RUN mkdir -p /var/lib/php/sessions && chown -R www-data:www-data /var/lib/php/sessions

COPY ./apache-config.conf /etc/apache2/sites-available/000-default.conf
