/*  The return of MySQL */

/**
 * Here is the server. The back end server.
 * This one receives requests, makes the SQL statements to the database and,
 * after getting the needed information, it sends the response back to the
 * front end server.
 */

// Load of the necessary modules
const express = require('express');
const app = express();
app.use(express.json());

/**
 * Importing the the file userDataModule.js.
 * This is where the functions for the users are
 * located. Special aspect to the fact the second
 * curvy brackets used are exactly for us to call
 * any function directly. Otherwise we would need
 * to declare a variable to hold the import.
 * */
require('./userDataModal')(app);

app.listen(1024);
console.log('Server running on port 1024...');
