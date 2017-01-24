import React from 'react';
import omit from 'lodash/omit';

import './style.scss';


import { STATE_DEFAULT, STATE_FILLED } from './constants';

import Step1 from './Steps/step-1';
import Step2 from './Steps/step-2';
import FormNavigation from './FormNavigation';

class FormDataset extends React.Component {
  constructor(props) {
    super(props);
    this.state = STATE_FILLED;

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
        if (this.state.step === this.state.stepLength && !this.state.submitting) {
          // Start the submitting
          this.setState({ submitting: true });

          // Send the request
          const xmlhttp = new XMLHttpRequest();
          xmlhttp.open('POST', 'http://api.resourcewatch.org/dataset');
          xmlhttp.setRequestHeader('Content-Type', 'application/json');
          xmlhttp.setRequestHeader('Authorization', this.state.form.authorization);
          xmlhttp.send(JSON.stringify({
            // Remove unnecesary atributtes to prevent unprocesable entities error
            dataset: omit(this.state.form, ['connectorUrlHint', 'authorization'])
          }));

          xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
              if (xmlhttp.status === 200 || xmlhttp.status === 201) {
                const response = JSON.parse(xmlhttp.responseText);
                const successMessage = `The dataset "${response.data.id}" - "${response.data.attributes.name}" has been uploaded correctly`;
                console.info(response);
                console.info(successMessage);
                alert(successMessage);

                // Stop the submitting
                this.setState({ submitting: false });
              } else {
                console.info('Error');
              }
            }
          };
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

        <FormNavigation
          step={this.state.step}
          stepLength={this.state.stepLength}
          submitting={this.state.submitting}
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
