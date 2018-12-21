import React, { Component } from 'react';
import axios from 'axios';

// Use of the bootstrap for the better style of all components
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

// Component needed when the user makes a successful login
import SuccessLogin from './SuccessLogin';

/**
 * This component deals with the user login.
 * If the credentials were correctly inserted,
 * the user is redirected to the page confirming
 * that the login was successful.
 */

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { error1: '', error2: '', token: '', showSuccess: false };
  }
  /**
   * This function updates the username or the password.
   * This is done character by character every time the user
   * writes anything on the input fields of the form.
   */
  updateInput = event => {
    event.preventDefault(); // Prevents page from reload
    // if (!element.empty && element.complete)
    this.setState({
      // While the first matches the specific object on state,
      // the second one assigns the value to the object.
      [event.target.name]: event.target.value
    });
  };

  /**
   * This function deals with the user login. It sends a request to the server
   * with the username and password inserted. If both match an existent account,
   * the server sends back a response with a token. This token is store on the
   * localStorage and on the object here from state. Then it's possible to see
   * all the other information.
   */
  login = async () => {
    const result = await axios('http://localhost:1024/login', {
      method: 'post',
      // The username and password to be sent
      data: {
        username: this.state.username,
        password: this.state.password
      },
      // Credentials option
      withCredentials: true
    });

    if (result.data.error === 0) {
      // alert('Login successful');

      localStorage.setItem('token', result.data.token);
      this.setState({
        token: localStorage.getItem('token'),
        showSuccess: true
      });
      // Updating the token from
      // the parent component

      // this.props.history.push('/'); // Keeping the home page link so it goes to the home component
    } else {
      // If there username or password are missing, errors come
      if (result.data.code === 10001)
        this.setState({
          error1: result.data.message
        });
      else {
        this.setState({
          error2: result.data.message
        });
      }
    }
  };

  /**
   * This function will call the function from the parent
   * component to update the token with the value of the
   * token store here.
   * It has a timeout. This is to give the possibility
   * for the user to first see the information
   * about the successful login. When the timeout is triggered,
   * the showSuccess is set to false. This way the "SuccessLogin"
   * component gets hidden again.
   */
  updateUserToken = () => {
    // this.timeStatus = setTimeout(() => {}, 5000);
    this.setState({
      showSuccess: false
    });
    this.props.changeStatus(this.state.token);
  };

  // Clearing the timeout when this component unmounts, then it's riderected
  // to the homepage where is the list of users
  async componentWillUnmount() {
    clearTimeout(this.timeStatus);
    // this.props.history.push('/'); // Keeping the home page link (so it goes to App.js)
  }

  render() {
    return (
      <div>
        {this.state.showSuccess === false ? (
          <div className="App-login">
            <h1>Users - JWT and MySQL</h1>
            <div>
              Username:{' '}
              <input
                type="text"
                name="username"
                className="form-control"
                onChange={this.updateInput} // Each written character is store on the specific object in state
              />
              {/* If there are errors to be shown... */}
              {this.state.error1 && (
                <div className="invalid-feedback d-block">
                  {this.state.error1}
                </div>
              )}
              <br />
              Password:{' '}
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={this.updateInput} // Each written character is store on the specific object in state
              />
              {/* If there are errors to be shown... */}
              {this.state.error2 && (
                <div className="invalid-feedback d-block">
                  {this.state.error2}
                </div>
              )}
            </div>
            <br />
            <br />
            {/* This is the button that calls the login function. */}
            <button className="btn btn-primary" onClick={this.login}>
              Login
            </button>
          </div>
        ) : (
          <SuccessLogin updateHandler={this.updateUserToken} />
        )}
      </div>
    );
  }
}

export default Login;
