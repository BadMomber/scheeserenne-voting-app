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
