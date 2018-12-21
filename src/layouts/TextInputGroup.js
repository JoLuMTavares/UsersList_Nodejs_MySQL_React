import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

// JSX

// import { Consumer } from '../Context';

/* Stateless component that works as a layout for input representation.
   It can be used for the user creation and/or for the user edition.
   Basically works like a function that receives its parameters and 
   returns a div as a form representation with the each parameter on
   the right place.
*/
const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  defaultValue,
  error
}) => {
  return (
    <div className="form-group mt-3">
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          label={label}
          className={classnames('form-control form-control-lg', {
            'is-invalid': error
          })}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          invalid="true"
        />
        {/* This is to show any error message if occurs. */}
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>
    </div>
  );
};

// This block forces the information insertion.
// Spefifically it makes sure that no input field is empty
TextInputGroup.propTypes = {
  label: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  error: propTypes.string
};

/* 
  If we are using only one single default type,
  we can use this.
TextInputGroup.defaultProps = {
  type: "text"
}

*/

export default TextInputGroup;
