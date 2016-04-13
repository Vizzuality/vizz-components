'use strict';

import _ from 'underscore';
import Backbone from 'backbone';
import LayerSpecModel from './LayerSpecModel';
import CartoDBLayer from './CartoDBLayer';

class LayersSpecCollection extends Backbone.Collection {

  instanceLayers() {
    _.each(this.models, (model) => {
      if (model.attributes.type === 'cartodb') {
        model.layerInstance = new CartoDBLayer(model.attributes);
      }
    });
  }

}

LayersSpecCollection.prototype.model = LayerSpecModel;

export default LayersSpecCollection;
