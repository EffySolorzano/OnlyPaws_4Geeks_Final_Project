rm -R -f ./migrations &&
pipenv run init &&
psql -U postgres -c 'DROP DATABASE example;' || true &&
psql -U postgres -c 'CREATE DATABASE example;' &&
psql -U postgres -c 'CREATE EXTENSION unaccent;' -d example &&
pipenv run migrate &&
pipenv run upgrade