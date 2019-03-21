import React from 'react';

// import { BrowserRouter as Link } from 'react-router-dom';

// Very important. Button is here and never used. But if it's removed
// from here, the button  (with the link inside) doesn't work
import { BrowserRouter as Button, Link } from 'react-router-dom';
/* This is a stateless component and it's imported by the "Users"
  component. It show the data about a user by a table cell. Inside this
  cell there are a single column for each data.
*/
let User = props => {
  const { id, name, email, city, phone, website } = props;
  // Style for the Edit button
  let buttonStyle = {
    borderRadius: '8%',
    backgroundColor: 'black',
    color: 'silver',
    width: '36px',
    height: '36px',
    boxShadow:
      '0 4px 8px 0 rgba(128, 98, 31, 0.2), 0 6px 20px 0 rgba(128, 98, 31, 0.19)',
    fontSize: '1.0em',
    margin: '2%'
  };

  // Setting for the table cell
  let cellStyle = {
    textAlign: 'center',
    width: '80px',
    padding: '0 15px 0 15px'
  };

  // Creation of an email address
  let mailTo = 'mailto:' + JSON.stringify(email);

  // Creation of a website link
  let websiteLink = (
    <a target="_blank" rel="noopener noreferrer" href={'https://' + website}>
      {website}
    </a>
  );

  return (
    // All the information here shown in each column is imported from the parent component (UserDetails)
    <tr style={cellStyle}>
      <td>{name}</td>
      <td>
        <a href={mailTo}>{email}</a>
      </td>
      <td>{city}</td>
      <td>{phone}</td>
      <td>{websiteLink}</td>
      <td>
        <button style={buttonStyle}>
          {/* This button has a link inside that redirects to the EditUser component. */}
          <Link to={'/edituser/' + id} title="Edit user information">
            <i className="fas fa-user-edit edit-icon" />
          </Link>
        </button>
        {/* This button calls the function "removeUserById" implemented above. It could also be written by "this.removeUserById.bind(user.id)". */}
        <button
          title="Remove this user"
          onClick={e => {
            if (
              window.confirm(
                'The user "' +
                  name +
                  '" will be removed. This action cannot be undone. Do you confirm?'
              )
            )
              props.removeHandler(id);
          }}
          style={buttonStyle}
        >
          {/* Icon characterization from the site Font Awesome. */}
          <i className="fas fa-user-minus remove-icon" />
        </button>{' '}
      </td>
    </tr>
  );
};

export default User;
