#!/bin/sh
./startMariaDB.sh
/opt/nginx/sbin/nginx
uwsgi --ini /usr/share/nginx/html/api/django.ini

# Hand off to the CMD
exec "$@"
