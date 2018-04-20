DROP DATABASE IF EXISTS djangodb;
CREATE DATABASE djangodb;
CREATE USER "django"@"localhost" IDENTIFIED BY "django";
GRANT ALL PRIVILEGES ON djangodb.* TO 'django'@'localhost';
