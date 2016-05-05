'use strict';

import Backbone from 'backbone';
import CartoDBLayer from './Layers/CartoDBLayer';
import TorqueLayer from './Layers/TorqueLayer';

const mapLayers = {
  'cartodb': CartoDBLayer,
  'torque': TorqueLayer
};

class LayerSpecModel extends Backbone.Model {

  initialize() {
    this.on('change:zIndex', () => {
      console.log('change z-index');
    });
  }

  instanceLayer() {
    const MapLayer = mapLayers[this.attributes.type];
    this.instancedLayer = new MapLayer(this.attributes);
    return this.instancedLayer;
  }

}

LayerSpecModel.prototype.idAttribute = 'slug';

export default LayerSpecModel;
