import React from 'react';
import './style.scss';

import Step from './step';
import Input from '../Fields/input';
import Textarea from '../Fields/textarea';
import Code from '../Fields/code';

class Step1 extends Step {
  constructor(props) {
    super(props);

    this.state = {
      dataset: props.dataset,
      form: props.form
    };
  }

  render() {
    return (
      <fieldset className="c-field-container">
        {!this.state.form.authorization &&
          <Input
            ref={(c) => { if (c) this.children.push(c); }}
            onChange={value => this.props.onChange({ authorization: value })}
            validations={['required']}
            properties={{
              name: 'authorization',
              label: 'Authorization token',
              type: 'text',
              required: true,
              default: this.state.form.authorization || ''
            }}
          />
        }

        <Input
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ name: value })}
          validations={['required']}
          properties={{
            name: 'name',
            label: 'Title',
            type: 'text',
            required: true,
            default: this.state.form.name
          }}
        />

        <Input
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ queryUrl: value })}
          validations={['required']}
          properties={{
            name: 'queryUrl',
            label: 'Query url',
            type: 'text',
            required: true,
            default: this.state.form.queryUrl
          }}
        />

        <Textarea
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ description: value })}
          properties={{
            name: 'description',
            label: 'Description',
            type: 'textarea',
            default: this.state.form.description
          }}
        />

        <Input
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ authors: value })}
          properties={{
            name: 'authors',
            label: 'Authors',
            type: 'text',
            default: this.state.form.authors
          }}
        />

        <Input
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ source: value })}
          properties={{
            name: 'source',
            label: 'Source',
            type: 'text',
            default: this.state.form.source
          }}
        />

        <Input
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ sourceUrl: value })}
          validations={['url']}
          properties={{
            name: 'sourceUrl',
            label: 'Source url',
            type: 'text',
            default: this.state.form.sourceUrl
          }}
        />

        <Code
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ widgetConfig: value })}
          properties={{
            name: 'widgetConfig',
            label: 'Widget config',
            type: 'textarea',
            default: this.state.form.widgetConfig
          }}
        />


      </fieldset>
    );
  }
}

Step1.propTypes = {
  dataset: React.PropTypes.string,
  form: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default Step1;
