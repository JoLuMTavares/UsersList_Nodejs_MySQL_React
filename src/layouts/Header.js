import React from 'react';

// JSX

import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

/*

This component has basically the links to other components. It's connected
to the parent component "App" via props. It has the bootstrap style and the
icons are from the site "Font Awesome".

We can use UL, LI and LINK and then you can make structure this...

*/

let Header = props => {
  const { title } = props;
  return (
    <div className="p-3 mb-2 bg-primary text-white">
      <div className="row justify-content-between ml-3 mr-3">
        <h1>{title}</h1>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="navbar-brand text-white">
                <i className="fas fa-home" /> Home
              </Link>
              <Link to="/adduser" className="navbar-brand text-white">
                <i className="fas fa-user-plus" /> Add
              </Link>

              {/* A different link. This calls the logout function from the "App" via props. That's why the to property is not used */}
              <Link
                to=""
                title="Logout"
                className="navbar-brand text-white"
                onClick={props.logoutHandler}
              >
                <i className="fas fa-sign-out-alt" />
              </Link>

              {/* <Link
                to=""
                title="Logout"
                className="navbar-brand text-white"
                onClick={props.logoutHandler}
              >
                <i className="fas fa-sign-out-alt" />
              </Link> */}

              {/* In this case this Dropdown is useful for different options related to the help menu. Here is only the "information" and "about", but it could be other options included (like "update" or "tutorial").*/}
              <Dropdown isOpen={props.openVal} toggle={props.dropdownHandler}>
                <DropdownToggle caret className="bg-primary">
                  <i className="fas fa-question-circle" /> Help
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className="bg-primary text-white">
                    <Link to="/information" className="navbar-brand text-white">
                      Information
                    </Link>
                  </DropdownItem>
                  <DropdownItem className="bg-primary text-white">
                    <Link to="/about" className="navbar-brand text-white">
                      About
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// In case there's no title defined on the Header tag from App.js
Header.defaultProps = {
  title: 'My App'
};

// Forcing this component to have a title
Header.propTypes = {
  title: propTypes.string.isRequired
};

/* +++++  SPECIAL SECTION FOR THE DROPDOWN MENU ++++++++ */

Dropdown.propTypes = {
  disabled: propTypes.bool,
  direction: propTypes.oneOf(['up', 'down', 'left', 'right']),
  group: propTypes.bool,
  isOpen: propTypes.bool,
  // For Dropdown usage inside a Nav
  nav: propTypes.bool,
  active: propTypes.bool,
  // For Dropdown usage inside a Navbar (disables popper)
  inNavbar: propTypes.bool,
  tag: propTypes.string, // default: 'div' unless nav=true, then 'li'
  toggle: propTypes.func,
  setActiveFromChild: propTypes.bool
};

DropdownToggle.propTypes = {
  caret: propTypes.bool,
  color: propTypes.string,
  className: propTypes.string,
  disabled: propTypes.bool,
  onClick: propTypes.func,
  'data-toggle': propTypes.string,
  'aria-haspopup': propTypes.bool,
  // For DropdownToggle usage inside a Nav
  nav: propTypes.bool,
  // Defaults to Button component
  tag: propTypes.any
};

DropdownMenu.propTypes = {
  tag: propTypes.string,
  children: propTypes.node.isRequired,
  right: propTypes.bool,
  flip: propTypes.bool, // default: true,
  className: propTypes.string,
  cssModule: propTypes.object,
  // Custom modifiers that are passed to DropdownMenu.js, see https://popper.js.org/popper-documentation.html#modifiers
  modifiers: propTypes.object,
  persist: propTypes.bool // presist the popper, even when closed. See #779 for reasoning
};

DropdownItem.propTypes = {
  children: propTypes.node,
  active: propTypes.bool,
  disabled: propTypes.bool,
  divider: propTypes.bool,
  tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
  header: propTypes.bool,
  onClick: propTypes.func,
  className: propTypes.string,
  cssModule: propTypes.object,
  toggle: propTypes.bool // default: true
};

export default Header;
