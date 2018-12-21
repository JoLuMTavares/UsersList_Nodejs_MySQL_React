import React, { Component } from 'react';

// JSX

import TextInputGroup from '../layouts/TextInputGroup';
import Axios from 'axios';

/* Stateful component that deals with the insertion of the user information, so
it can be inserted on the database. */
class AddContact extends Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.cityInput = React.createRef();
    this.phoneInput = React.createRef();
    this.websiteInput = React.createRef();
    this.idInput = React.createRef();
  }

  // Objects to store the information when inserted by the user.
  state = {
    name: ' ',
    email: ' ',
    city: '',
    phone: ' ',
    website: '',
    id: 0,
    errors: {}
  };

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
      // While the first matches the specific object on state,
      // the second one assigns the value to the object.
      [event.target.name]: event.target.value
    });
  };

  // This function handles the creation of the new user (on the front end side)
  handleNewContact = () => {
    // event.preventDefault(); // Prevents page from reload

    // A random value created to be store on the database
    const newId = Math.floor(Math.random(10) * 10000);

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
      id: newId,
      errors: {}
    };

    // This is where the request is made. It's a post request, since the
    // information has to be store on the database.
    Axios.post(`http://localhost:1024/newuser`, Person).then(response => {
      // If the operation was successful, the alert is shown to the user
      alert('User successfully added.');
      this.props.history.push('/'); // Keeping the home page link so it goes to the home component
    });
  };

  render() {
    return (
      <div className="Add-Contact-Form">
        <TextInputGroup
          type="text"
          label="Name"
          className="name form-control"
          name="name" // This is value that must macth the identification of the object store in state.
          placeholder="Enter name"
          onChange={this.updateInformation} // This calls the function that stores what the user writes on the object store in state.
          error={this.state.errors.name}
        />
        <TextInputGroup
          type="email"
          label="Email"
          className="email form-control"
          name="email" // This is value that must macth the identification of the object store in state.
          placeholder="Enter email"
          onChange={this.updateInformation} // This calls the function that stores what the user writes on the object store in state.
          error={this.state.errors.email}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
        <TextInputGroup
          type="text"
          label="City"
          className="city form-control"
          name="city" // This is value that must macth the identification of the object store in state.
          placeholder="Enter city name"
          onChange={this.updateInformation} // This calls the function that stores what the user writes on the object store in state.
          error={this.state.errors.city}
        />
        <TextInputGroup
          type="text"
          label="Phone"
          className="phone form-control"
          name="phone" // This is value that must macth the identification of the object store in state.
          placeholder="Enter phone"
          onChange={this.updateInformation} // This calls the function that stores what the user writes on the object store in state.
          error={this.state.errors.phone}
        />{' '}
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your phone with anyone else.
        </small>
        <TextInputGroup
          type="text"
          label="Website"
          className="website form-control"
          name="website" // This is value that must macth the identification of the object store in state.
          placeholder="Enter website"
          onChange={this.updateInformation} // This calls the function that stores what the user writes on the object store in state.
          error={this.state.errors.website}
        />{' '}
        {/* This button call the function to handle the user creation.
            The two ways to do this are with the use of bind (as "this.handleNewContact.bind()") or by the use of arrow function
            like it is written bellow.
        */}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => this.handleNewContact()}
        >
          Add Contact{' '}
        </button>
      </div>
    );
  }
}

export default AddContact;
