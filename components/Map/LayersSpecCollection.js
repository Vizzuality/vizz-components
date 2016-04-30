'use strict';

import Backbone from 'backbone';
import LayerSpecModel from './LayerSpecModel';

class LayersSpecCollection extends Backbone.Collection {

  initialize() {
    this._layers = {}; // Layers instanced on map
  }

  setMap(map) {
    this.subscriber = map;
  }

  addLayer(id) {
    const layerSpec = this.get(id);
    const layer = this.getLayer(id);
    // Trying to not create a new instance every time
    if (!layer && layerSpec && !layerSpec.instancedLayer) {
      layerSpec.instanceLayer().createLayer((l) => {
        this.subscriber.addLayer(l);
        this._layers[id] = l;
      });
    } else if (!layer && layerSpec && layerSpec.instancedLayer) {
      this.subscriber.addLayer(layerSpec.instancedLayer.layer);
      this._layers[id] = layerSpec.instancedLayer.layer;
    }
  }

  removeLayer(id) {
    const layer = this.getLayer(id);
    if (layer) {
      this.subscriber.removeLayer(layer);
      this.clearLayer(id);
    }
  }

  getLayer(id) {
    return this._layers[id];
  }

  clearLayer(id) {
    delete this._layers[id];
  }

}

LayersSpecCollection.prototype.model = LayerSpecModel;

export default LayersSpecCollection;
