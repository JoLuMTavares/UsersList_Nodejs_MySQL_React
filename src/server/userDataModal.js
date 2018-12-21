/**
 * This module contains operations to be called by the server.js.
 */

let dbConn = require('./databaseConnection.js');

// Calling the global function that includes all the needed functions

module.exports = function(app) {
  // Using a variable to the module initialization
  var dbConnection = new dbConn();

  // For random string generation
  const randomstring = require('randomstring');

  /* Specific list of users entitled to operate on the application. */
  const users = [
    { id: 1000, name: 'joao', password: 'v16power' },
    { id: 1001, name: 'jan', password: 'foobar' },
    { id: 1002, name: 'Maria', password: 'check' }
  ];

  // All this modules are important for the JSON Web Token use
  const jwt = require('jsonwebtoken');
  const cors = require('cors');
  // These next two modules provide the possibility of an authentication using
  // JSON web token (instead of sessions)
  const passport = require('passport');
  const passportJWT = require('passport-jwt');

  // Options for the right connection to be accepted (front the front end server)
  const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
  };

  // Important instruction - extractor - to accept a request object as an
  // argument and return the enconded JWT string (or null)
  const ExtractJwt = passportJWT.ExtractJwt;
  // Controlling how the token is extracted (or verified) from the request
  const JwtStrategy = passportJWT.Strategy;
  const jwtOptions = {};

  // The jwtFromRequest is a function that accepts a request as the only parameter
  // and returns either the JWT as a string or null.
  // In this case, the return comes from the function - fromAuthHeaderAsBearerToken
  // This last function creates a new extractor that looks for the JWT in the
  // authorization header with the scheme 'bearer'
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = 'devugeesV16InsanePower'; // Secret key or master key
  // when needed

  // Black list for users that logged out
  const tokenBlacklist = [];

  /**
   * Strategy for checking how is the black list. Every time this is used,
   * the black list gets a reset. This is because every time a login is made,
   * new tokens are assigned. Therefore, it's important to discard the tokens
   * that are not needed anymore.
   * The jwt_payload is an object literal containing the decoded JWT payload.
   */
  const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    tokenBlacklist.forEach(internalId => {
      if (internalId === jwt_payload.internalId) {
        return next(null, false);
      }
    });

    /**
     * For the list of store users here, each one has a comparison of the id
     * with the one from the jwt_payload. If it matches, the internal id of
     * of jwt_payload is assigned to the internal id of the user.
     */
    users.forEach(user => {
      if (jwt_payload.id === user.id) {
        user.internalId = jwt_payload.internalId;
        return next(null, user);
      }
    });
    // If there's no match at all
    return next(null, false);
  });

  passport.use(strategy); // Using the created strategy above

  app.use(cors(corsOptions)); // Using the options for the connection
  app.use(passport.initialize()); // Initialization of the control

  /**
   *
   * @param {*} currObject
   *
   * Auxiliary function function for a new user insertion. It confirms that
   * all the elements have been filled before the query construction.
   */
  this.bodyValidator = currObject => {
    let found = true;
    if (
      !currObject.body.name ||
      !currObject.body.email ||
      !currObject.body.city ||
      !currObject.body.phone ||
      !currObject.body.website
    )
      found = false;
    return found;
  };
  /**
   *
   * @param {*} currObject
   *
   * This function just creates an array with the elements given
   * from the front end server. Then returns it.
   */
  this.arrayCreator = currObject => {
    return [
      currObject.body.id,
      currObject.body.name,
      currObject.body.email,
      currObject.body.city,
      currObject.body.phone,
      currObject.body.website
    ];
  };

  /**
   *
   * @param {*} currObject
   *
   * This function created the update query for the database.
   * First it checks which element(s) and its value(s) were sent in
   * order to be updated. Then it creates a query based on
   * this element. Finally it returns the query.
   */
  this.updateQueryCreator = currObject => {
    let term = ''; // Name of the field that needs to be updated
    let value = ''; // The new value

    // Checking which elements were sent to be updated
    if (currObject.body.name) {
      term = 'name';
      value = currObject.body.name;
    } else if (currObject.body.email) {
      term = 'email';
      value = currObject.body.email;
    } else if (currObject.body.city) {
      term = 'city';
      value = currObject.body.city;
    } else if (currObject.body.phone) {
      term = 'phone';
      value = currObject.body.phone;
    } else if (currObject.body.website) {
      term = 'website';
      value = currObject.body.website;
    }

    // The query sintax
    var query =
      'UPDATE user_data.user SET ' +
      term +
      ' = "' +
      value +
      '" WHERE id = ' +
      currObject.body.id;

    // Returning this query
    return query;
  };

  /**
   * This function deals with the login. First it's checked if both username
   * and password were sent from the front end server. Then the inserted
   * information is compared to the stored entitled users. If it matches with
   * one of then a token is created and associated with this user. This token has
   * also an expired time so, after that, the user is automatically logged out.
   */
  app.post('/login', (req, res) => {
    // Checking if the username and password were sent
    if (!req.body.username) {
      return res.send({ error: 10001, message: 'username required' });
    } else if (!req.body.password) {
      return res.send({ error: 10002, message: 'password required' });
    }

    // Checking for a match
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].name === req.body.username &&
        users[i].password === req.body.password
      ) {
        // Creation of a payload object. Here the random string is created for
        // the token creation
        const payload = {
          id: users[i].id,
          internalId: randomstring.generate(10)
        };

        // Creation of the token where the parameters are the payload
        // and the secretOrKey (created above). Time expiration is one day.
        const token = jwt.sign(payload, jwtOptions.secretOrKey, {
          expiresIn: '1d'
        });

        // Sending the token to the front end server.
        return res.send({ error: 0, token: token });
      }
    }
    // If there's no match, the specific message is sent
    return res.send({ error: 1001, message: 'User not found!' });
  });

  /**
   * This function deals with the logout. It must receive the authentication
   * parameter (with session element as false ). Then the black list gets
   * the internal Id of the logged out user.
   *
   * Finally the confirmation message is sent back to the front end server.
   */
  app.post(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      tokenBlacklist.push(req.user.internalId);
      return res.send({ error: 0, message: 'Logout successful' });
    }
  );

  // To get the list of users store on the "user" table
  app.get('/userslist', function(req, res) {
    // Calling the function from the databaseOperations.js
    dbConnection.genQuery('select * from user', function(usersList) {
      return res.send(usersList); // Sending the response to the front end server
    });
  });

  // To get one single user.
  app.get('/user', function(req, res) {
    // Checking if the id of the user was given.
    if (!req.query.id)
      return res.send({
        error: 'No given id! This element is necessary.'
      });

    // Creating the query to be sent. The id is assigned with "?"
    // and the value is assigned on the query instruction.
    var selectQuery = 'select * from user where id = "' + req.query.id + '"';

    // Calling the function from the databaseOperations.js
    dbConnection.genQuery(selectQuery, function(user) {
      return res.send(user); // Sending the response to the front end server
    });
  });

  // To insert a new user
  app.post('/newuser', function(req, res) {
    // Using the validator from the serverOperations.js to check for missing data
    if (!this.bodyValidator(req))
      return res.send({
        error: 'Missing one or more elements! All the elements are mandatory.'
      });

    // The string that represents the query to be sent. The values will be stored
    // on an object. This object will be the second parameter of the query to be
    // sent.
    var target_query =
      'insert into user (id, name, email, city, phone, website) values (?,?,?,?,?,?)';

    // The object that holds the given data
    let userInfo = this.arrayCreator(req);

    // Calling the function from the databaseOperations.js
    dbConnection.queryWithParameter(target_query, userInfo, function(response) {
      return res.send({ error: 0, response }); // Sending the response to the front end server
    });
  });

  /**
   * The user update. In this case there's one special aspect. Only the
   * information changed is sent to this server. Therefore it's important to
   * verify which of the attributes were sent. The query also must be constructed
   * on that way.
   * Depending on how many elements need to be changed, the query must contain
   * the right names of the fields to be updated.
   */
  app.put('/userUpdate', function(req, res) {
    // Using the function to create the query
    var updateQuery = this.updateQueryCreator(req);

    // Calling the function from the databaseOperations.js
    dbConnection.genQuery(updateQuery, function(user) {
      return res.send(user); // Sending the response to the front end server
    });
  });

  // To remove a user
  app.delete('/user', function(req, res) {
    // 1. Checking the id was given
    if (!req.query.id)
      return res.send(
        'No given id! You must give the id of the product you want deleted.'
      );

    // The query  string  (as the first parameter) to be sent to the database
    var delete_sql = 'delete from user where id = ?';

    // Calling the function from the databaseOperations.js
    dbConnection.queryWithParameter(delete_sql, [req.query.id], function(rows) {
      return res.send(rows); // Sending the response to the front end server
    });
  });
};
