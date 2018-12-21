/**
 * This component just shows the information to the user
 * about the successful login. After a few seconds, the
 * user is redirected to the home page.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Use of the bootstrap for the better style of all components
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

class SuccessLogin extends Component {
  // This represents the timeout status. After the timeout triggers, it must
  // be cleared. Therefore, this variable is used.
  timeStatus = '';

  state = {
    message: '' // Message to be shown to the user
  };

  /**
   * When the component is mounted, it creates this message
   * to be show. This message includes a link to the home page.
   * This link has also the possibility to directly call
   * the function from the Login component in case the "interval"
   * doesn't work properly.
   */
  async componentDidMount() {
    this.setState({
      message: (
        <div className="App-login">
          <h1>Login Successful</h1>
          <p>
            If you are not redirected in 5 seconds, please click
            <Link to="/" onClick={this.props.updateHandler}>
              {' '}
              here
            </Link>
            .
          </p>
        </div>
      )
    });
    // This is the important part. The interval of three seconds
    // before running the call instruction
    this.timeStatus = setInterval(
      () =>
        // Calling the function "updateToken" stored on the Login component
        this.props.updateHandler(),
      3000
    );
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

export default SuccessLogin;
