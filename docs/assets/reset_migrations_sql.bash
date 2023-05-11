rm -R -f ./migrations &&
pipenv run init &&
psql -u root -p -e "DROP DATABASE example;" &&
psql -u root -p -e "CREATE DATABASE example;" &&
pipenv run migrate &&
pipenv run upgrade