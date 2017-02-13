import React from 'react';

import './style.scss';

import Validator from '../validator';

class Field extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.properties.default,
      valid: null,
      error: []
    };

    // VALIDATOR
    this.validator = new Validator();

    // BINDINGS
    this.triggerChange = this.triggerChange.bind(this);
    this.triggerValidate = this.triggerValidate.bind(this);
  }

  /**
   * VALIDATIONS
   * - triggerValidate ()
  */
  triggerValidate() {
    const { validations } = this.props;
    const { value } = this.state;

    const isValuePresent = (Array.isArray(value)) ? value.length > 0 : value;

    // Check if it has validations &&
    // if a value is defined or if required validation is present
    if (validations && (isValuePresent || validations.indexOf('required') !== -1)) {
      // VALIDATE
      const validateArr = this.validator.validate(validations, value);
      const valid = validateArr.every(element => element.valid);
      const error = (!valid) ? validateArr.map(element => element.error) : [];

      this.setState({
        valid,
        error
      });
    } else {
      this.setState({
        valid: (isValuePresent) ? true : null,
        error: []
      });
    }
  }

  isValid() {
    return this.state.valid;
  }
}

Field.propTypes = {
  properties: React.PropTypes.object.isRequired,
  hint: React.PropTypes.string,
  validations: React.PropTypes.array,
  onChange: React.PropTypes.func
};

export default Field;
