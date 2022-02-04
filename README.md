# Capstone: Restaurant Reservation System

## Installation

1. Run npm install to install project dependencies.
2. Run npm run start:dev to start the server in development mode.
3. Run the full test suite with npm run test.
4. To run frontend and backend tests separately run npm run test:frontend or npm run test:backend

Use `npm start` to run the application.


## App Summary

•Allows users to create, edit, and delete reservations. <br/>
•Allows for users to create tables. <br/>
•Reservations can be sat at the tables and finished when they are done. <br/>
•Allows for users to search for existing reservations by phone number. <br/>

## API Documentation
API Path	Method(s)<br/>
/reservations	GET: List all reservations<br/>
/reservations	POST: Create a new reservation.<br/>
/reservations/?date='YYYY-MM-DD'	GET: List all reservations by date.<br/>
/reservations/:reservation_id	GET: Read a single reservation by 'reservation_id'.<br/>
/reservations/:reservation_id	PUT: Update a reservation by 'reservation_id'.<br/>
/reservations/:reservation_id	DELETE: Delete a reservation by 'reservation_id'.<br/>
/reservations/:reservation_id/status	PUT: Update a reservation's status. Options being "booked", "seated", or "finished".<br/>
/tables	GET: List all tables.<br/>
/tables	POST: Create a new table.<br/>
/tables/:table_id	GET: Read a single table by 'table_id'.<br/>
/tables/:table_id	DELETE: Delete a table by 'table_id'.<br/>
/tables/:table_id/seat	PUT: Update a table's status to "occupied".<br/>
/tables/:table_id/seat	DELETE: Update a table's status to "free".<br/>

## Project Tech Stack

# Frontend

Bootstrap<br/>
CSS<br/>
HTML<br/>
JavaScript<br/>
React<br/>

# Backend

Express<br/>
JavaScript<br/>
Knex<br/>
Node.js<br/>

# Database

PostgreSQL<br/>
Production Site Through Heroku<br/>


## app screenshots
	
<img width="1434" alt="Reservations Dashboard" src="https://user-images.githubusercontent.com/84490798/152451440-57e872a9-31e2-4be9-abeb-26ce6f448d89.png">
<img width="1433" alt="New Table" src="https://user-images.githubusercontent.com/84490798/152451447-ac11b6ab-b97c-457b-ba19-78c2469b720e.png">
<img width="1431" alt="New Reservation" src="https://user-images.githubusercontent.com/84490798/152451452-1bbce141-59c9-4809-abe1-0f2957be3190.png">
<img width="1440" alt="Search" src="https://user-images.githubusercontent.com/84490798/152451457-e4d330b1-15ad-4ed7-8b48-5c40715a8400.png">
