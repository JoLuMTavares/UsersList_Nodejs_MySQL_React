import React from 'react';

/* A stateless component that just shows information about this application. */
export default () => {
  return (
    <div>
      <h1 className="display-4">Help Information</h1>
      <p className="lead">
        Welcome to this small application. The home page shows the list of the
        names of registered users on the database.
      </p>
      <p className="lead">
        You can edit the user information by pressing the button located on the
        right side of the user detailed information.
      </p>
      <p className="lead">
        To create a new user, you can select the Add option on the navigation
        bar.
      </p>
      <p className="lead">
        You can also delete a specific user where you see the list of users.
      </p>
    </div>
  );
};
