'use strict';

import _ from 'underscore';
import Backbone from 'backbone';

class ParamsModel extends Backbone.Model {

  parse(data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Checking is value is a number
        const value = Number(data[key]);
        if (!isNaN(value)) {
          data[key] = value;
        }
      }
    }
    return data;
  }

  validate(attributes) {
    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        // Checking is value is a number
        const value = Number(attributes[key]);
        if (isNaN(value)) {
          return 'it should be a valid number';
        }
      }
    }
  }

}

export default ParamsModel;
