# run app

make sure you have node 12.xx active - in the project root dir type

```
$ nvm use 12
```

Install project and packages

```
$ npm i
```

## run server

make sure you have postgres running - type

```
$ psql -U username postgres
$ CREATE DATABASE sva;
$ \q
```

migrate you tables to database - in server dir type

```
$ knex migrate:latest
```

seed your dev data to the database - in server dir type

```
$ knex seed:run
```

run server - in server dir type

```
$ npm run dev
```

## run client

cd to client dir  
make sure to use node version 12.xx - type

```
$ nvm use 12
```

start client - in client dir type

```
$ npm run dev
```

## use app environment

you will find the frontend on localhost:3000 and server on localhost:4000
