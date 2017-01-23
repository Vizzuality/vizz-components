import React from 'react';
import './style.scss';

import Validator from '../validator';

class Input extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.properties.default || '',
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
   * UI EVENTS
   * - triggerChange
  */
  triggerChange(e) {
    this.setState({ value: e.currentTarget.value }, () => {
      // Trigger validation
      this.triggerValidate();
      // Publish the new value to the form
      if (this.props.onChange) this.props.onChange(this.state.value);
    });
  }

  /**
   * VALIDATIONS
   * - triggerValidate (value)
  */
  triggerValidate() {
    const { validations } = this.props;
    const { value } = this.state;

    // Check if a value is present
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

  render() {
    const { properties, hint } = this.props;
    const { valid, error } = this.state;

    // Set classes
    const validClass = valid === true ? '-valid' : '';
    const errorClass = valid === false ? '-error' : '';

    return (
      <div className={`c-field ${validClass} ${errorClass}`}>
        {properties.label &&
          <label htmlFor={`input-${properties.name}`} className="label">
            {properties.label} {properties.required && <abbr title="required">*</abbr>}
          </label>
        }

        {hint &&
          <p className="hint">
            {hint}
          </p>
        }

        <input
          {...properties}
          value={this.state.value}
          id={`input-${properties.name}`}
          onChange={this.triggerChange}
        />

        {error &&
          error.map((err, i) => {
            if (err) {
              return (
                <p key={i} className="error">
                  {err.message}
                </p>
              );
            }
            return null;
          })
        }

      </div>
    );
  }
}

Input.propTypes = {
  properties: React.PropTypes.object.isRequired,
  hint: React.PropTypes.string,
  validations: React.PropTypes.array,
  onChange: React.PropTypes.func
};

export default Input;
