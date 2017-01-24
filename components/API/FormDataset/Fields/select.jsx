import React from 'react';
import Select from 'react-select';
import Field from './field';

class SelectInput extends Field {
  /**
   * UI EVENTS
   * - triggerChange
  */
  triggerChange(selected) {
    const value = (selected) ? selected.value : null;
    this.setState({ value }, () => {
      // Trigger validation
      this.triggerValidate();
      // Publish the new value to the form
      if (this.props.onChange) this.props.onChange(this.state.value);
    });
  }

  render() {
    const { options, properties, hint } = this.props;
    const { valid, error, value } = this.state;

    // Set classes
    const validClass = valid === true ? '-valid' : '';
    const errorClass = valid === false ? '-error' : '';

    return (
      <div className={`c-field ${validClass} ${errorClass}`}>
        {properties.label &&
          <label htmlFor={`select-${properties.name}`} className="label">
            {properties.label} {properties.required && <abbr title="required">*</abbr>}
          </label>
        }

        {hint &&
          <p className="hint">
            {hint}
          </p>
        }

        <Select
          {...properties}
          options={options}
          id={`select-${properties.name}`}
          value={value}
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

SelectInput.propTypes = {
  properties: React.PropTypes.object.isRequired,
  options: React.PropTypes.array.isRequired,
  hint: React.PropTypes.string,
  validations: React.PropTypes.any,
  onChange: React.PropTypes.func
};

export default SelectInput;
