import React from 'react';
import Field from './field';

class Textarea extends Field {
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

        <textarea
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

Textarea.propTypes = {
  properties: React.PropTypes.object.isRequired,
  hint: React.PropTypes.string,
  validations: React.PropTypes.array,
  onChange: React.PropTypes.func
};

export default Textarea;
