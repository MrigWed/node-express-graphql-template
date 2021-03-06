#!/bin/sh

export ENVIRONMENT=local
export NODE_ENV=local
./node_modules/.bin/sequelize db:drop
./node_modules/.bin/sequelize db:create
./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/sequelize db:seed:all
yarn start:local