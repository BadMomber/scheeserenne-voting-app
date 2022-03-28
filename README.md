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

## restart postgres
brew services stop postgresql  
brew services start postgresql 

# TODO
Alle Votes eines Voters holen (Ranking eines Voters)  
  
Dann geht er durch dieses Ranking und baut die Pärchen (pairs) -> Befülle scheese_pairs table  
  
zähle anzahl der vorliegenden votes für Pärchen und schreibe auf jeweiliges Pärchen  
  
aggregate distance for every pair  
  
calculate normed_distance with weights (by calcWeight * distance)  
  
aggregate normed distance  
  
// neue function - es gibt jetzt für jedes Scheesepair eine normed distance  
  
Ranking erstellen  
  
gehe alle scheesen durch  
  
für jede scheese pair finden in der diese scheese auftaucht  
  
wenn aktuelle scheese = scheese_one -> positive normed distance aggregieren  
  
wenn aktuelle scheese = scheese_two -> negative normed distance aggregieren  
  
Scheesen nach aggregierten normed distances sortieren  
  
falls gleich distance bei 2 scheesen, dann first scheese mit mehr votes (höherem weight)  
  
wenn das gleich dann admin fragen  
