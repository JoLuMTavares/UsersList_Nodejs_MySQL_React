import React, { Component } from 'react';

/* This component is called when the user tries to access a page that doesn't
exist or if a component, for unknown reasons, is unaccessible. 
It returns a single div with the 404 error code and a message.
*/
export default class NotFound extends Component {
  render() {
    return <div>404 - Page not Found!</div>;
  }
}
