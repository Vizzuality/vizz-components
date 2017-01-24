import React from 'react';
import './style.scss';

import { TOPICS, PROVIDERS } from '../constants';

import Step from './step';
import Input from '../Fields/input';
import SelectInput from '../Fields/select';
import Token from '../Fields/token';

class Step1 extends Step {
  constructor(props) {
    super(props);

    this.state = {
      form: props.form
    };
  }

  render() {
    return (
      <fieldset className="c-field-container">
        <Input
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ authorization: value })}
          validations={['required']}
          properties={{
            name: 'authorization',
            label: 'Authorization token',
            type: 'text',
            required: true,
            default: this.state.form.authorization
          }}
        />

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
          onChange={value => this.props.onChange({ subtitle: value })}
          properties={{
            name: 'subtitle',
            label: 'Subtitle',
            type: 'text',
            default: this.state.form.subtitle
          }}
        />

        <SelectInput
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ topics: [value] })}
          validations={['required']}
          blank
          options={TOPICS}
          properties={{
            name: 'topics',
            label: 'Topics',
            default: this.state.form.topics[0],
            required: true
          }}
        />

        <Token
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange({ tags: value })}
          validations={['required']}
          hint="This will cover different vocabularies that represent this dataset.
           Please write them comma separated: water,food"
          properties={{
            name: 'tags',
            label: 'Tags',
            type: 'text',
            default: this.state.form.tags,
            required: true
          }}
        />

        <SelectInput
          ref={(c) => { if (c) this.children.push(c); }}
          onChange={value => this.props.onChange(this.providerDictionary[value])}
          validations={['required']}
          blank
          options={PROVIDERS}
          properties={{
            name: 'provider',
            label: 'Provider',
            default: this.state.form.provider,
            required: true
          }}
        />
      </fieldset>
    );
  }
}

Step1.propTypes = {
  form: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default Step1;
