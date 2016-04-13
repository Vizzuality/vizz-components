'use strict';

import _ from 'underscore';
import Backbone from 'backbone';
import L from 'leaflet';

class MapView extends Backbone.View {

  initialize(props) {
    this._layers = {};
    this.options = _.extend({}, this.defaults, props.options || {});
    this.createMap();
    this.setBasemap();
  }

  /**
   * Create map using Leaflet
   * http://leafletjs.com/reference.html#map-usage
   */
  createMap() {
    this.map = L.map(this.el, this.options);
  }

  /**
   * Add basemap to map, use this to add other basemap instead current
   * @param {Object} basemapSpec http://leafletjs.com/reference.html#tilelayer
   */
  setBasemap(basemapSpec) {
    if (!basemapSpec) {
      basemapSpec = {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        options: {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
      };
    }
    if (this.basemap) {
      this.map.removeLayer(this.basemap);
    }
    this.basemap = L.tileLayer(basemapSpec.url, basemapSpec.options);
    this.basemap.addTo(this.map);
  }

  /**
   * Remove and add layer by name
   * @param {String} layerName
   * @param {Object} layerSpec
   */
  addLayer(layerName, layerSpec) {
    const layer = this._layers[layerName];
    if (layer) {
      this.map.removeLayer(layer);
    }
    this.map.addLayer(layerSpec);
    this._layers[layerName] = layerSpec;
  }

}

MapView.prototype.defaults = {
  zoom: 7,
  center: [40, -3],
  scrollWheelZoom: false
};

export default MapView;
