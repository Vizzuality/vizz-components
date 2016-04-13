'use strict';

import _ from 'underscore';
import React from 'react';
import MapView from './MapView';
import Legend from './Legend';

class Map extends React.Component {

  constructor(props) {
    super(props);
    if (props.layersSpec && props.layersSpec.length) {
      this.layersSpec = this.props.layersSpec;
    }
  }

  /**
   * When DOM exists load Leaflet and create map
   */
  componentDidMount() {
    this.mapView = new MapView({
      el: this.refs.Map,
      options: this.props.mapOptions
    });

    // If layersSpec prop exists, so we will add them.
    this.toogleLayers();

    // If layersSpec change remove or add layers
    this.layersSpec.on('change', () => {
      this.toogleLayers();
    });
  }

  /**
   * Use this method to check all layers to show or hide them
   */
  toogleLayers() {
    if (this.layersSpec && this.layersSpec.models.length) {
      _.each(this.layersSpec.models, (layer) => {
        if (layer.attributes.active) {
          layer.layerInstance.createLayer((l) => {
            this.mapView.addLayer(layer.attributes.name, l);
          });
        } else {
          layer.layerInstance.removeLayer(this.mapView.map);
        }
      });
    }
  }

  /**
   * Avoid render, this component doesn't use Virtual DOM
   * @return false
   */
  shouldComponentUpdate(nextProps) {
    return false;
  }

  updateLayer(layerInstance) {
    layerInstance.addLayer(this.mapView.map);
  }

  render() {
    let legend = null;
    if (this.props.legend) {
      legend = (<Legend layersSpec={ this.layersSpec } />);
    }
    return (
      <div ref="Map" className="c-map">
        { legend }
      </div>
    );
  }

}

Map.propTypes = {
  layersSpec: React.PropTypes.object, // Backbone Collection
  mapOptions: React.PropTypes.object,
  legend: React.PropTypes.bool
};

Map.defaultProps = {
  mapOptions: MapView.prototype.defaults,
  legend: true
};

export default Map;
