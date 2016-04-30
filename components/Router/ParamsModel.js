'use strict';

import _ from 'underscore';
import Backbone from 'backbone';

class ParamsModel extends Backbone.Model {

  validate(attributes) {
    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        // Checking is value is a number
        const value = Number(attributes[key]);
        if (!isNaN(value)) {
          attributes[key] = value;
        }
      }
    }
  }

}

export default ParamsModel;
