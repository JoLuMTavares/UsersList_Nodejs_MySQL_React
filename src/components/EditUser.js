import React, { Component } from 'react';

// JSX

import TextInputGroup from '../layouts/TextInputGroup';
import Axios from 'axios';

/* Stateful component that has the similar behavior as the "AddUser". 
  The difference is that here it gets the user id from its parent component
  via Routing.

  After that comes the most important. Every component, when called, always tries
  to render before any other execution (except the constructor). With this, if the
  needed information is not yet stored, errors will come out, since there's nothing to be shown. 

  To avoid this, it's important to program a prevention. The component won't try
  to show anything then unless the information is completely loaded.
  
*/

export default class EditContact extends Component {
  // Constructor where the object is initialized with no value
  constructor() {
    super();
    this.state = { user: '' };
  }

  // Getting the right user from the database once again
  async componentDidMount() {
    // With the given id, it sends a request to the server. The response
    // will be an array with different elements, but only the object on
    // the first position - [0] - is needed.
    try {
      Axios.get(
        'http://localhost:1024/user?id=' + this.props.match.params.id
      ).then(response => {
        this.setState({
          // Storing the object on the one initialized in the constructor
          user: response.data[0]
        });
      });
    } catch (error) {
      console.log('error = ' + error);
    }
  }

  /* This function stores what the user writes in the input field.
     For each input field, the information is store on the object of the
     "state". This is done by the corresponding identification. That's why
     every input field has the "name" tag. The value of this tag must match
     the same name of the object belonging to "state". That way the value of the
     input is stored character by character.
  */
  updateInformation = event => {
    event.preventDefault(); // Prevents page from reload
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // This function handles the update of the current user (on the front end side).
  // It works on a similar way as the function on "handleNewContact" "AddUser" component
  handleContact = () => {
    // The id from the parent component
    const { id } = this.props.match.params;

    // Assigning the objects of the state to this set of objects
    const { name, email, city, phone, website } = this.state;

    // Test to make shore no object (that is going to be sent to the server) is empty
    if (name === ' ') {
      this.setState({
        errors: { name: 'Name is required' }
      });
      return;
    }
    if (email === ' ') {
      this.setState({
        errors: { email: 'Email is required' }
      });
      return;
    }
    if (city === ' ') {
      this.setState({
        errors: { city: 'City is required' }
      });
      return;
    }
    if (phone === ' ') {
      this.setState({
        errors: { phone: 'Phone is required' }
      });
      return;
    }
    if (website === ' ') {
      this.setState({
        errors: { website: 'Please write a website' }
      });
      return;
    }
    // Creation of an object with the name "Person"
    const Person = {
      name: name,
      email: email,
      city: city,
      phone: phone,
      website: website,
      id: id,
      errors: {}
    };
    try {
      // This is where the request is made. It's a post request, since the
      // information has to be store on the database.
      Axios.put(`http://localhost:1024/userUpdate`, Person).then(response => {
        // If the operation was successful, the alert is shown to the user
        alert('User successfully updated.');
        this.props.history.push('/'); // Keeping the home page link so it goes to the home component
      });
    } catch (error) {
      console.log('error = ' + error);
    }
  };

  render() {
    return (
      <div>
        {/* The great difference. As mentioned on the beginning, the object is here evaluated. If it does not exist or does not contain any information yet, nothing will be shown. Otherwise, this div is shown with the current user information. */}
        {this.state.user ? (
          <div className="Edit-Contact-Form">
            <TextInputGroup
              type="text"
              label="Name"
              className="name form-control"
              name="name" // This is value that must match the identification of the object store in state.
              defaultValue={this.state.user.name} // Current information retrieved from the user store on the database
              placeholder="Enter name"
              onChange={this.updateInformation} // This calls the function that stores what the user writes on the object store in state.
              // error={this.state.errors.name}
            />
            <TextInputGroup
              type="email"
              label="Email"
              className="email form-control"
              name="email" // This is value that must macth the identification of the object store in state.
              defaultValue={this.state.user.email} // Current information retrieved from the user store on the database
              placeholder="Enter email"
              onChange={this.updateInformation} // This calls the function that stores what the user writes on the object store in state.
              // error={this.state.errors.email}
            />
            <TextInputGroup
              type="text"
              label="City"
              className="city form-control"
              name="city" // This is value that must macth the identification of the object store in state.
              defaultValue={this.state.user.city} // Current information retrieved from the user store on the database
              placeholder="Enter city name"
              onChange={this.updateInformation} // This calls the function that stores what the user writes on the object store in state.
              // error={this.state.errors.city}
            />
            <TextInputGroup
              type="text"
              label="Phone"
              className="phone form-control"
              name="phone" // This is value that must macth the identification of the object store in state.
              defaultValue={this.state.user.phone} // Current information retrieved from the user store on the database
              placeholder="Enter phone"
              onChange={this.updateInformation} // This calls the function that stores what the user writes on the object store in state.
              // error={this.state.errors.phone}
            />
            <TextInputGroup
              type="text"
              label="Website"
              className="website form-control"
              name="website" // This is value that must macth the identification of the object store in state.
              defaultValue={this.state.user.website} // Current information retrieved from the user store on the database
              placeholder="Enter website"
              onChange={this.updateInformation} // This calls the function that stores what the user writes on the object store in state.
              // error={this.state.errors.website}
            />{' '}
            {/* This button call the function to handle the user update.
                The two ways to do this are with the use of bind (as "this.handleContact.bind()") or by the use of arrow function
                like it is written bellow.
            */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => this.handleContact()}
            >
              Save{' '}
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
