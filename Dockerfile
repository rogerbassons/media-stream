FROM tiangolo/nginx-rtmp

# NodeJS
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt update && apt-get install -y nodejs

#PIP and uwsgi
RUN apt-get install -y python3-pip python3-dev ffmpeg gpac

# Django
RUN pip3 install django djangorestframework django-cors-headers mysqlclient uwsgi

# MariaDB
COPY config/createDB.sql .
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y mariadb-server
RUN service mysql start && mysql < createDB.sql

RUN mkdir -p /usr/share/nginx/html && mkdir -p /usr/share/nginx/html/api
COPY config/nginx.conf /etc/nginx/nginx.conf

COPY --chown=www-data:www-data server/ /usr/share/nginx/html/api/
COPY --chown=www-data:www-data config/addUser.py /usr/share/nginx/html/api/
RUN mkdir /usr/share/nginx/html/videos && mkdir /usr/share/nginx/html/streams && mkdir /usr/share/nginx/html/thumbs
RUN service mysql start && cd /usr/share/nginx/html/api && python3 manage.py migrate && python3 manage.py shell < addUser.py
RUN mkdir /usr/share/nginx/html/api/tmp


COPY client client
RUN cd client && npm install && npm run build && cp -r build/* /usr/share/nginx/html/ && chown -R www-data:www-data /usr/share/nginx/html


EXPOSE 80 1935


COPY config/entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]