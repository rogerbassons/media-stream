FROM jasonrivers/nginx-rtmp

RUN apk add python3 python3-dev py-pip ffmpeg mariadb mariadb-client nodejs nodejs-npm

RUN DB_DATA_PATH="/var/lib/mysql" ; \
    DB_ROOT_PASS="1234" ; \
    DB_USER="mariadb_user" ; \
    DB_PASS="mariadb_user_password" ; \
    MAX_ALLOWED_PACKET="200M"  ; \
    mysql_install_db --user=mysql --datadir="/var/lib/mysql"

RUN apk add git coreutils build-base && git clone https://github.com/gpac/gpac.git && \
    cd gpac && \
    ./configure --static-mp4box --use-zlib=no && \
    make -j4 && \
    make install

# Django
RUN apk add mariadb-dev linux-headers && \
    pip3 install django djangorestframework django-cors-headers uwsgi mysqlclient

# MariaDB
COPY config/startMariaDB.sh .    
COPY config/createDB.sql .
RUN ./startMariaDB.sh &&  \
    mysql < createDB.sql

RUN mkdir -p /usr/share/nginx/html && mkdir -p /usr/share/nginx/html/api
COPY config/nginx.conf /opt/nginx/conf/nginx.conf

RUN set -x ; \
    addgroup -g 82 -S www-data ; \
    adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1

COPY --chown=www-data:www-data server/ /usr/share/nginx/html/api/
COPY --chown=www-data:www-data config/addUser.py /usr/share/nginx/html/api/

RUN mkdir /usr/share/nginx/html/videos && \
    mkdir /usr/share/nginx/html/live && \
    mkdir /usr/share/nginx/html/thumbs

RUN ./startMariaDB.sh && \
    cd /usr/share/nginx/html/api && \
    python3 manage.py migrate && \ 
    python3 manage.py shell < addUser.py

RUN mkdir /usr/share/nginx/html/api/tmp


COPY client client
RUN cd client && \
    npm install && \
    npm run build && \
    cp -r build/* /usr/share/nginx/html/ && \
    chown -R www-data:www-data /usr/share/nginx/html


EXPOSE 80 1935 8083


COPY config/entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
