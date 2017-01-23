import React from 'react';
import './style.scss';

class StepNavigation extends React.Component {
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
    return (
      <ul className="c-field-buttons">
        {this.props.step !== 1 &&
          <li>
            <button type="button" name="commit" onClick={this.onBack}>
              Back
            </button>
          </li>
        }
        {this.props.step !== this.props.stepLength &&
          <li>
            <button type="submit" name="commit">
              Next
            </button>
          </li>
        }
        {this.props.step === this.props.stepLength &&
          <li>
            <button type="submit" name="commit">
              Submit
            </button>
          </li>
        }
      </ul>
    );
  }
}

StepNavigation.propTypes = {
  step: React.PropTypes.number,
  stepLength: React.PropTypes.number,
  onBack: React.PropTypes.func
};

export default StepNavigation;
