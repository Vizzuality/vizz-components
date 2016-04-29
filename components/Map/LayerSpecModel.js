import Backbone from 'backbone';
import CartoDBLayer from './Layers/CartoDBLayer';
import TorqueLayer from './Layers/TorqueLayer';

const layersClass = {
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
    const LayerClass = layersClass[this.attributes.type];
    this.instancedLayer = new LayerClass(this.attributes);
    return this.instancedLayer;
  }

}

LayerSpecModel.prototype.idAttribute = 'slug';

export default LayerSpecModel;
