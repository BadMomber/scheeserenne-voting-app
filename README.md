# run app

make sure you have node 12.xx active - type in the project root dir

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

migrate you tables to database - type

```
$ knex migrate:latest
```

seed your dev data to the database - type

```
$ knex seed:run
```
