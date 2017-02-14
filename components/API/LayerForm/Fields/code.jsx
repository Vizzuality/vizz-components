import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

import Field from './field';


class Code extends Field {
  constructor(props) {
    super(props);

    this.state = {
      value: JSON.stringify(this.props.properties.default || {}, null, 2),
      valid: null,
      error: []
    };
  }
  /**
   * UI EVENTS
   * - triggerChange
  */
  triggerChange(value) {
    this.setState({ value }, () => {
      try {
        // Trigger validation
        // this.triggerValidate();
        // Publish the new value to the form
        const parsedValue = JSON.parse(value);
        if (this.props.onChange) this.props.onChange(parsedValue);
      } catch (err) {
        // console.error(err);
      }
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

        <AceEditor
          mode="json"
          theme="github"
          value={this.state.value}
          tabSize={2}
          editorProps={{ $blockScrolling: true }}
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

Code.propTypes = {
  properties: React.PropTypes.object.isRequired,
  hint: React.PropTypes.string,
  validations: React.PropTypes.array,
  onChange: React.PropTypes.func
};

export default Code;
