#!/bin/sh

nginx && service mysql start && /usr/local/bin/uwsgi --plugins http,python --ini /usr/share/nginx/html/api/django.ini

# Hand off to the CMD
exec "$@"
