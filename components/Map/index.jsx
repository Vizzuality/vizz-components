'use strict';

import './style.css';
import _ from 'underscore';
import React from 'react';
import Legend from './Legend';
import LayersSpecCollection from './LayersSpecCollection';

class Map extends React.Component {

  constructor(props) {
    super(props);
    if (props.layersData) {
      this.layersSpec = new LayersSpecCollection(props.layersData);
    }
    this.state = {
      zoom: props.mapOptions.zoom,
      center: props.mapOptions.center
    };
  }

  /**
   * Create map using Leaflet
   * http://leafletjs.com/reference.html#map-usage
   */
  createMap() {
    this.map = L.map(this.refs.MapElement, this.props.mapOptions);
    this.layersSpec.setMap(this.map);
    // Setting basemap
    this.setBasemap();
    // Exposing click event
    this.map.on('click', this.props.onClick);
  }

  /**
   * Add basemap to map, use this to add other basemap instead current
   * @param {Object} basemapSpec http://leafletjs.com/reference.html#tilelayer
   */
  setBasemap(basemapSpec) {
    const currentBasemap = basemapSpec || this.props.mapOptions.basemapSpec;
    if (this.basemap) {
      this.map.removeLayer(this.basemap);
    }
    this.basemap = L.tileLayer(currentBasemap.url, currentBasemap.options);
    this.map.addLayer(this.basemap, {zIndex: -1}); // always on back
  }

  /**
   * This method will update all layers
   */
  setLayers() {
    _.each(this.layersSpec.models, layerSpec => {
      if (!layerSpec.get('active')) {
        this.removeLayer(layerSpec.id);
      } else {
        this.addLayer(layerSpec.id);
      }
    });
  }

  /**
   * Method to add a layer
   * @param {String} slug
   */
  addLayer(slug) {
    this.layersSpec.addLayer(slug);
  }

  /**
   * Method to remove a layer from map
   * @param  {String} slug
   */
  removeLayer(slug) {
    this.layersSpec.removeLayer(slug);
  }

  /**
   * When DOM exists create map
   */
  componentDidMount() {
    this.createMap();
    this.setLayers();
    this.layersSpec.on('change', this.setLayers.bind(this));
  }

  /**
   * Avoid render, this component doesn't use Virtual DOM
   * @return false
   */
  shouldComponentUpdate(a, nextProps) {
    return false;
  }

  render() {
    let legend = null;
    if (this.props.legend) {
      legend = (<Legend layersSpec={ this.layersSpec } />);
    }
    return (
      <div ref="MapElement" className="c-map">
        { legend }
      </div>
    );
  }

}

Map.propTypes = {
  layersData: React.PropTypes.array, // JSON array
  mapOptions: React.PropTypes.object, // http://leafletjs.com/reference.html#map-usage
  legend: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

Map.defaultProps = {
  mapOptions: {
    zoom: 5,
    center: [40, -3], // Madrid
    scrollWheelZoom: false,
    basemapSpec: {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      options: {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    }
  },
  legend: true,
  onClick: function() {}
};

export default Map;
