import React, { Component } from 'react';

import axios from 'axios';

// Use of the bootstrap for the better style of all components
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './layouts/Header';

import Users from './components/Users';
// import UserDetails from './components/UserDetails';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
// import testComp from './components/testComp';

import Information from './pages/Information';
import About from './pages/About';
import NotFound from './NotFound';

import Login from './components/UserLog/Login';
import SuccessLogin from './components/UserLog/SuccessLogin';
import SuccessLogout from './components/UserLog/SuccessLogout';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/**
 * The main component where everything is connected.
 *
 * The components are connected with the use of "Switch" and "Router".
 * There is a component created as a navigation bar anyone can see the
 * different pages. This component is named "Header" and has the links
 * to the other pages. It also has a specific link for the logout option.
 * This gives the advantage of loading the different information without
 * having to reload the page, even though the persons sees it like pages
 * are being loaded.
 *
 * Describing the other components:
 *  - The "Users" component shows the all the information of the users.
 *  - The "EditUser" gives the possibility of changing the current information of
 *    the user. This component also receives the id of the specified user.
 *  - The "AddUser" deals with the creation of a new user.
 *  - The "About" component only shows some information about the application.
 *
 * At the beginning we see a login page. If the inserted username and password are
 * correct, then the we will see the list of names of the users. If we want to
 * more information, we can select the name of the specific user. We can also
 * delete a user by pressing the button located at the right side of each user.
 *
 * We also can edit the user's information by pressing the button on the right
 * side each user.
 * After the changes have been made, we can select save, so the
 * updated information is sent to the server.
 *
 * If we want to add a new user, we must select the "Add" link located on the
 * right side of the navigation bar (after "Home" link). All the fields need to
 * be filled. After that we can select the "Add Contact" button, so the new user
 * is sent to the server.
 *
 * If we want to logout, we just need to select the Logout icon located on the
 * right side of the navigation bar (last link).
 *
 *
 */
class App extends Component {
  state = {
    username: '',
    password: '',
    token: '',
    error1: '',
    error2: '',
    dropdownOpen: false, // Special for the help menu on the "Header" component
    showLoggedOut: false // When the user logs out, this stay as true, so the
    // SuccessLogout component can loaded
  };

  location = '/';

  // This function switches the value for the dropdown help menu
  toggleDpMenu() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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
        token: localStorage.getItem('token')
      });
      // return <Redirect to="/loggedin" />;
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

  updateToken = tValue => {
    this.setState({
      token: tValue
    });
    // console.log(this.state.token);
    // this.props.history.push('/loggedin');
  };

  /** This function makes the logout. it sends a logout request with the right
   * associated token. If everything goes well, the response comes with error
   * code "0", then all the objects on state are reset to its initial values.
   */
  logout = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios('http://localhost:1024/logout', {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      if (result.data.error === 0) {
        // alert(result.data.message);
        this.setState({
          showLoggedOut: true
        });
        this.timeStatus = setInterval(
          () =>
            this.setState({
              token: '',
              error1: '',
              error2: '',
              showLoggedOut: false
            }),
          // Router.dispatch('/', null)
          3000
        );
      }
    } catch (e) {
      alert(e);
    }
  };

  async componentWillUpdate() {
    clearInterval(this.timeStatus);
  }

  /* This function stores what the user writes in the input field.
     For each input field, the information is store on the object of the
     "state". This is done by the corresponding identification. That's why
     every input field has the "name" tag. The value of this tag must match
     the same name of the object belongin to "state". That way the value of the
     input is stored character by character.
  */
  updateInputHandler = event => {
    this.setState({
      // While the first matches the specific object on state,
      // the second one assigns the value to the object.
      [event.target.name]: event.target.value
    });
  };
  render() {
    /* Here the most important condition. If the object "token" initially is empty, than only the login screen is shown. Otherwise the information about the registered users is shown as well as all available options.*/
    return (
      <Router>
        {this.state.showLoggedOut === true ? (
          <SuccessLogout />
        ) : this.state.token === '' || this.state.token === undefined ? (
          <Login status={this.state.token} changeStatus={this.updateToken} />
        ) : (
          /**
           * When the login is made, this is the div to be shown.
           */

          <div className="App container">
            <Header
              title="Users"
              logoutHandler={this.logout}
              openVal={this.state.dropdownOpen}
              dropdownHandler={() => this.toggleDpMenu()}
            />
            <Switch>
              <Route exact path="/" component={Users} />
              <Route exact path="/loggedin" component={SuccessLogin} />
              <Route exact path="/loggedout" component={SuccessLogout} />
              {/* <Route exact path="/userdetails/:id" component={UserDetails} /> */}
              <Route exact path="/edituser/:id" component={EditUser} />
              <Route exact path="/adduser" component={AddUser} />
              <Route exact path="/information" component={Information} />
              <Route exact path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
        )}
      </Router>
    );
  }
}

export default App;
