### Installing an app
Clone the project:
```
git clone https://github.com/valentine909/nodejs-st-22-rest-api
```
Run the following command in the terminal to install dependencies:
```
npm install
```
Rename `.env.example` to `.env`. Change the PORT or POSTGRES variables as needed.
Make sure that postgres database is running (locally, in the docker container or in the cloud) and it's connection properties corresponds to that described in the `.env` file.
### First run (Migration)
Generate migration by running:
```
npm run migration:generate
```
Build the app:
```
npm run build
```
Apply migration:
```
npm run migration:up
```
NB! Postgres database must be running and set up correctly when migration is to be applied.
### Running an app
Run the following command in the terminal:
```
npm run start
```
Application is accessible at the following endpoint by default:
```
localhost:4000/api/v1/users
```
###TASK 3.1
1. Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL
(https://www.heroku.com/postgres or https://www.elephantsql.com/plans.html).
2. Write SQL script which will create Users table in the DB and fill it in with predefined users’
collection.
3. Configure your REST service to work with PostgreSQL.
4. Use the sequelize package (http://docs.sequelizejs.com/) as ORM to work with
PostgreSQL.
As an alternative to sequelize you can use more low-level query-builder library
( http://knexjs.org/ ).

###TASK 3.2

The service should adhere to 3-layer architecture principles (https://softwareontheroad.com/ideal-
nodejs-project-structure/) and contain the following set of directories:

```
|- routers / controllers
|- services
|- data-access
|- models
```
