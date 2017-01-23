import React from 'react';
import './style.scss';

import { PROVIDER_DICTIONARY } from '../constants';

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.providerDictionary = PROVIDER_DICTIONARY;
    this.children = [];
  }

  shouldComponentUpdate() {
    this.children = [];
    return true;
  }

  validate() {
    this.children.forEach((c) => {
      c.triggerValidate();
    });
  }

  isValid() {
    const valid = this.children
      .map(c => c.isValid())
      .filter(v => v !== null)
      .every(element => element);

    return valid;
  }
}

Step.propTypes = {
};

export default Step;
