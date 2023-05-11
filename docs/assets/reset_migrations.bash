rm -R -f ./migrations &&
pipenv run init &&
mysql -U root -c 'DROP DATABASE project_db;' || true &&
mysql -U root -c 'CREATE DATABASE project_db;' &&
mysql -U root -c 'CREATE EXTENSION unaccent;' -d project_db &&
pipenv run migrate &&
pipenv run upgrade