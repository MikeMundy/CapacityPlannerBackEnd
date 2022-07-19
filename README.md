# CapacityPlannerBackEnd
Back End API for the React Capacity Planner Front End (https://github.com/MikeMundy/CapacityPlanner)

## Local MySQL Database creation

The app uses a MySQL database. To install MySQL locally, see https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/windows-installation.html

(Download MS version of MySQL at https://dev.mysql.com/downloads/installer/)

Note: Make sure you use STRONG passwords! Weak passwords may result in MySQL refusing your connections!

Open the MySQL command line client (and run as administrator). 

Enter MySQL root password. 

Execute 'CREATE DATABASE capacityplanner;'

Open the MySQL Workbench.

Database -> Connect to Database -> connect to Stored Connection; Local instance MySQL80. You'll need to log in with your root account password (and save the password in the vault when prompted).

File -> Open SQL Script -> navigate to the root of your project and select 'db.sql'. 

Select the Schemas tab (at the bottom of the section at the top left), then select the capacityplanner db, and right-click and select as Default Schema. You should see a bunch of scripts execute as the new tables are created. 

Return to the Schemas box and select right-click, Refresh All. You should see the tables are now listed. 

Go to Server -> Users and Privileges

Delete the default pre-created user account (ie.e I deleted my MikeMundy account).

Add Account -> enter your user account details and select Authentication Type = "Standard" and Limit to Hosts Matching = 'localhost'. 

Select 'login', set Login Name to user account name and enter the password in the Password and Confirm Password fields, then Apply. 

Select the Administrative Roles tab anbd tick the DBA option, then Apply.  

Select the Schema Privileges tab. Select MikeMundy user, then Tick the 'capacityplanner' schema, then click all the Object Rights checkboxes, then click Apply. 

## Update the local config to point to your local MySQL database

In the project, go to the app/config/db.config file. 

Update the PORT to the port for you local MySQL instance. 

Update the USER to the name of your local MySQL user account.

Update the PASSWORD to the password for your local MySQL user account.

Update the DB to 'capacityplanner'.


NOTE: Don't check these changes into the repo!!

## Update the CORS setting to allow your front end to access the back end service

In the project, go to the server.js file (in the root).

Update the corsOptions object so that the 'origin' is set to the URL where your front end is running (probably something like 'http://localhost:3001').

### Point the front end to the back end service

Go to your local copy of the front end code. 

Open \src\DAL\http-common.ts and update the baseURL to point to the URL where the back end is exposed (see 'Running the API locally' below to run the 
service and see where it running.) It'll probably be something like http://localhost:8080/api/ 

## Running the API locally

To run the API, from a command line prompt, run:

`npm run start`

## Production Hosting

The app is hosted on Azure... Keikhosro to add production hosting directions here.