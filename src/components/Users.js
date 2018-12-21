import React, { Component } from 'react';
import Axios from 'axios';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import User from '../layouts/User';

/*
    This component shows the list of users stored on the database.
    A table with the detailed information about each user.

    There's also the button for each name that removes the specific user
    from the database.
*/
export default class Users extends Component {
  // State with the only needed object, initialized with null value
  state = {
    users: null
  };

  /**
   * After being mounted, a request is sent to the server.
   * The response will be an array with the list of users.
   */
  async componentDidMount() {
    try {
      Axios.get('http://localhost:1024/userslist').then(response => {
        this.setState({
          users: response.data
        });
      });
    } catch (error) {
      console.log('error = ' + error);
    }
  }

  // Remove user from the array using an id
  removeUserById = id => {
    try {
      // Sending the request to the server
      Axios.delete('http://localhost:1024/user?id=' + id).then(response => {
        // If the operation went well, this same user is also removed from
        // the "users" object
        const usersTemp = [...this.state.users];

        let finalUsers = usersTemp.filter(user => user.id !== id);

        this.setState({
          users: finalUsers
        });
        alert('User successfully deleted.');
      });
    } catch (error) {
      console.log('error = ' + error);
    }
  };

  render() {
    return (
      <div className="Users">
        <table className="UsersList">
          <thead>
            <tr className="headersStyle">
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="dataCells">
            {/* Here the cell are only shown when the "users" object has information stored. By the use of "map" (which works as a loop), each selected user is then presented by the name. */}
            {this.state.users &&
              this.state.users.map(user => {
                return (
                  <User
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    city={user.city}
                    phone={user.phone}
                    website={user.website}
                    removeHandler={this.removeUserById}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}
