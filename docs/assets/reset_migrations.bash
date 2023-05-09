rm -R -f ./migrations &&
pipenv run init &&
mysql -U rhyccia -c 'DROP DATABASE project_db;' || true &&
mysql -U rhyccia -c 'CREATE DATABASE project_db;' &&
mysql -U rhyccia -c 'CREATE EXTENSION unaccent;' -d project_db &&
pipenv run migrate &&
pipenv run upgrade