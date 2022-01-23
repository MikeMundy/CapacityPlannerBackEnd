# CapacityPlannerBackEnd
Back End for the React Capacity Planner Front End

## Database creation

If you are running this app using a local MySQL database, you will need to install MySQL. 

The live site runs using MySQL hosted on Azure; contact Keikhosro for details. 

In order to create the MySQL database structure, run the db.sql script located in the root of the project in the MySQl Workbench. 

## Configuration

### Azure MySQL Configuration

If you using a MySQL database hosted on Azure, you will need to add a '.env' file to the root of the project, with the following contents:

DB_HOST=[URL to the Azure Dn, something like (database name).mysql.database.azure.com]\
DB_PORT=[Port where the database is exposed]\
DB_USER=[Name of the database user]\
DB_PASS=[Password for the database user]\
DB_NAME=capacity-planner\
DB_SSL=C:\Users\mmundy\Source\Git\CapacityPlannerBackEndKeikFork\CapacityPlannerBackEnd\BaltimoreCyberTrustRoot.crt.pem\

### Local MySQL Configuration

If you using a MySQL database hosted on your local machine, you will need to add a '.env' file to the root of the project, with the following contents:

DB_HOST=localhost\
DB_PORT=[Port where the database is exposed]\
DB_USER=[Name of the database user]\
DB_PASS=[Password for the database user]\
DB_NAME=capacity-planner\

You will also need to go to ./app/config/db.config and comment out the 'DB_SSL' line. 

You also need to go to ./app/models/db.js and comment out line 5 ('const serverCa = ...') and comment out the connection.ssl property in line 13. 

### CORS configuration

The back end service will only accept requests originating from the URL set in server.js. Update the corsOptions.origin property with the URL where your front end is hosted (likely to be 'origin: "http://localhost:3000"' ). 

## Running the Back End API

To run the API, from a command line prompt, run:

`npm run start`


