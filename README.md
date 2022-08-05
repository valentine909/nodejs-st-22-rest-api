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
### Before first run (Migration)
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
Application is accessible at the following endpoints by default:
```
localhost:4000/api/v1/users
localhost:4000/api/v1/groups
```
You can use `NodeJS Short-track 2022.postman_collection.json` for convenient testing.

---
### TASK 4.1
Add Group entity to already existing REST service with CRUD operations:
1. The Group entity should have the following properties (you can use UUID as Group id):
2. The service should provide the following CRUD operations for Group:
   - get group by id;
   - get all groups;
   - create and update a group;
   - remove group (hard delete – group data is fully removed from the DB).
3. Storing of groups data should be done in PostgreSQL in Groups table.
4. The service should follow the principles of 3-layer architecture.

### TASK 4.2
Link User records in one table with Group records in another table.
- Add a UserGroup table (“many-to-many” relationship) which will store the data describing
which users are assigned to which group.
- If any record gets removed from the DB, then all linked records should be removed from
UserGroup as well.

### TASK 4.3
Add addUsersToGroup(groupId, userIds) method which will allow adding users to a certain group.
Use transactions to save records in DB.

### TASK 3.1
1. Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL
(https://www.heroku.com/postgres or https://www.elephantsql.com/plans.html).
2. Write SQL script which will create Users table in the DB and fill it in with predefined users’
collection.
3. Configure your REST service to work with PostgreSQL.
4. Use the sequelize package (http://docs.sequelizejs.com/) as ORM to work with
PostgreSQL.
As an alternative to sequelize you can use more low-level query-builder library
( http://knexjs.org/ ).

### TASK 3.2
The service should adhere to 3-layer architecture principles (https://softwareontheroad.com/ideal-
nodejs-project-structure/) and contain the following set of directories:

```
|- routers / controllers
|- services
|- data-access
|- models
```
