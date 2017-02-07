import React from 'react';
import './style.scss';

class FormNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.step,
      stepLength: props.stepLength
    };

    this.onBack = this.onBack.bind(this);
  }

  /**
   * UI EVENTS
   * - onBack
  */
  onBack(event) {
    event.preventDefault();

    // Validate the form
    this.props.onBack(this.props.step - 1);
  }

  render() {
    const { step, stepLength, submitting } = this.props;
    return (
      <ul className="c-field-buttons">
        {step !== 1 &&
          <li>
            <button type="button" name="commit" onClick={this.onBack}>
              Back
            </button>
          </li>
        }
        {step !== stepLength &&
          <li>
            <button type="submit" name="commit">
              Next
            </button>
          </li>
        }
        {step === stepLength &&
          <li>
            <button type="submit" name="commit" disabled={submitting}>
              Submit
            </button>
          </li>
        }
      </ul>
    );
  }
}

FormNavigation.propTypes = {
  step: React.PropTypes.number,
  stepLength: React.PropTypes.number,
  onBack: React.PropTypes.func,
  submitting: React.PropTypes.bool
};

export default FormNavigation;
