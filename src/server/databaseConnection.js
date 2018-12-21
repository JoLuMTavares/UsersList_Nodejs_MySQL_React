/**
 * This is the file containing the database connection. It also contains
 * the needed queries to comunicate with the database. It's then loaded
 * by the userDataModule.js, so it can be used.
 *
 * For that, this file needs to be implemented as a module export.
 * Only that way the functions are available.
 */

// MySQL module load
const mysql = require('mysql');

// Using the export instruction to make all functions available
function dbConn() {
  // Connection settings to MySQL database
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_data'
  });

  // Connecting the database
  con.connect(function(err) {
    if (err) {
      console.log('Error connecting to Db');
      return;
    }
    console.log('Database connected');
  });

  /**
   * This is the function that deals with query operations. It needs the
   * con (that represents the connection to the database) to make the operation.
   * But there's more. Here we have the "query" as the first parameter.
   * The second parameter is "callback" which represents a function. So
   * we have a function as the second parameter. The reason to do this is
   * to directly call a function. This is on the server file.
   * This way, the result of the made operation on the database,
   * will be directly inside the server.js. The function there will do the rest.
   */
  this.genQuery = function(query, callback) {
    // Sending the query to the database
    con.query(query, function(err, data) {
      if (err) throw err; // If any error occurred

      console.log(data);
      // If everything worked well, the callback (function as parameter) is
      // then used
      callback(data);
    });
  };

  /**
   * This function deals with insertion of elements on the database. It needs the
   * con (that represents the connection to the database) for the insertion.
   * Here we have the "query" as the first parameter.
   * The second parameter is the set (array) of the elements to be inserted.
   * The third parameter is "callback" which represents a function. So
   * we have a function as the third parameter. The reason to do this is
   * to directly call a function. This is on the server.js.
   * This way, the result obtained from the insertion will be directly inside
   * the server.js. The function there will do the rest.
   */
  this.queryWithParameter = function(query, elements, callback) {
    // Sending the query to the database
    con.query(query, elements, function(err, result) {
      if (err) throw err; // If any error occurred

      console.log(result);
      // If everything worked well, the callback (function as parameter) is
      // then used
      callback(result);
    });
  };
}

module.exports = dbConn;
