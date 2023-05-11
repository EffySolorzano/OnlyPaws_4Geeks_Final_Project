rm -R -f ./migrations &&
pipenv run init &&
psql -U postgres -c 'DROP DATABASE project_db;' || true &&
psql -U postgres -c 'CREATE DATABASE project_db;' &&
psql -U postgres -c 'CREATE EXTENSION unaccent;' -d project_db &&
pipenv run migrate &&
pipenv run upgrade