/**
 * This component just show the information to the user
 * about the successful logout. After a few seconds, the
 * user is redirected to the login screen.
 */
import React, { Component } from 'react';

// Use of the bootstrap for the better style of all components
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

class SuccessLogout extends Component {
  // This represents the timeout status. After the timeout triggers, it must
  // be cleared. Therefore, this variable is used.
  timeStatus = '';

  state = {
    message: '' // Message to be shown to the user
  };

  /**
   * When the component is mounted, it creates this message
   * to be show. This message includes a link to the home page.
   */
  async componentDidMount() {
    this.setState({
      message: (
        <div className="App-login">
          <h1>Logout Successful</h1>
          <p>You will be redirected to the login page.</p>
        </div>
      )
    });
  }

  // Clearing the interval when this component unmounts, then it's riderected
  // to the homepage where is the list of users
  async componentWillUnmount() {
    clearInterval(this.timeStatus);
  }
  render() {
    // Just the render of the message
    return this.state.message;
  }
}

export default SuccessLogout;
