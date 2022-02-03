<h1>Capstone: Restaurant Reservation System</h1>
<h3>Installation</h3>

Run npm install to install project dependencies.

Run `npm run start:dev` to start the server in development mode.

Run the full test suite with `npm run test`.

To run frontend and backend tests separately run `npm run test:frontend` or `npm run test:backend`

Use `npm start` to run the application.

<h3>App Summary</h3>

•Allows users to create, edit, and delete reservations.

•Allows for users to create tables.

•Reservations can be sat at the tables and finished when they are done.

•Allows for users to search for existing reservations by phone number.


<h3>API Documentation</h3>

API Path Method(s)

/reservations GET: List all reservations

/reservations POST: Create a new reservation.

/reservations/?date='YYYY-MM-DD' GET: List all reservations by date.

/reservations/:reservation_id GET: Read a single reservation by 'reservation_id'.

/reservations/:reservation_id PUT: Update a reservation by 'reservation_id'.

/reservations/:reservation_id DELETE: Delete a reservation by 'reservation_id'.

/reservations/:reservation_id/status PUT: Update a reservation's status. Options being "booked", "seated", or "finished".

/tables GET: List all tables.

/tables POST: Create a new table.

/tables/:table_id GET: Read a single table by 'table_id'.

/tables/:table_id DELETE: Delete a table by 'table_id'.

/tables/:table_id/seat PUT: Update a table's status to "occupied".

/tables/:table_id/seat DELETE: Update a table's status to "free".


<h3>Project Tech Stack</h3>

<h4>Frontend</h4>

Bootstrap

CSS

HTML

JavaScript

React

<h4>Backend</h4>

Express

JavaScript

Knex

Node.js


<h3>Database</h3>

PostgreSQL

DBeaver

Deployed with Heroku

