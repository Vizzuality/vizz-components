import React from 'react';
import './style.scss';

import Step1 from './Steps/step-1';
import Step2 from './Steps/step-2';
import StepNavigation from './StepNavigation';

class FormDataset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      stepLength: 2,
      form: {
        // STEP 1
        name: '',
        subtitle: '',
        application: [props.application],
        topics: [],
        tags: [],
        provider: '',
        connectorProvider: '',
        connectorType: '',
        connectorUrlHint: '',

        // STEP 2
        connectorUrl: '',
        legend: {
          lat: null,
          long: null,
          date: [],
          country: []
        }
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * UI EVENTS
   * - onSubmit
   * - onChange
  */
  onSubmit(event) {
    event.preventDefault();

    // Validate the form
    this.step.validate();

    // Set a timeout due to the setState function of react
    setTimeout(() => {
      const valid = this.step.isValid();
      if (valid) {
        if (this.state.step === this.state.stepLength) {
          console.info(this.state);
        } else {
          this.setState({
            step: this.state.step + 1
          }, () => console.info(this.state));
        }
      }
    }, 0);
  }

  onChange(obj) {
    const form = Object.assign({}, this.state.form, obj);
    this.setState({ form }, () => console.info(this.state.form));
  }

  onBack(step) {
    this.setState({ step });
  }

  render() {
    return (
      <form className="c-form" onSubmit={this.onSubmit} noValidate>
        {(this.state.step === 1) &&
          <Step1
            ref={(c) => { this.step = c; }}
            onChange={value => this.onChange(value)}
            form={this.state.form}
          />
        }

        {(this.state.step === 2) &&
          <Step2
            ref={(v) => { this.step = v; }}
            onChange={value => this.onChange(value)}
            form={this.state.form}
          />
        }

        <StepNavigation
          step={this.state.step}
          stepLength={this.state.stepLength}
          onBack={step => this.onBack(step)}
        />
      </form>
    );
  }
}

FormDataset.propTypes = {
  application: React.PropTypes.string
};

export default FormDataset;
