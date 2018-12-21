import React from 'react';

/* A stateless component that just shows information about this application. */
export default () => {
  return (
    <div>
      <h1 className="display-4">About Users</h1>
      <p className="lead">Small user list application</p>
      <p className="text-secondary">Version 1.3.1</p>
      <p className="text-secondary" style={{ fontSize: '0.8em' }}>
        The Tavares 2018
      </p>
    </div>
  );
};
