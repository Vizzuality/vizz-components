'use strict';

import Backbone from 'backbone';
import CartoDBLayer from './CartoDBLayer';

class LayerSpecModel extends Backbone.Model {

  instanceLayer(data) {
    if (this.attributes.type === 'cartodb') {
      this.instanceLayer = new CartoDBLayer(this.attributes);
    }
  }

}

LayerSpecModel.prototype.defaults = {
  account: '', // String
  type: 'cartodb', // String
  sql: null, // String
  cartocss: null, // String
  active: true // Boolean
};

export default LayerSpecModel;
