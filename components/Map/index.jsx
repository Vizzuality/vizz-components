'use strict';

import _ from 'underscore';
import React from 'react';
import MapView from './MapView';
import Legend from './Legend';
import LayersSpecCollection from './LayersSpecCollection';

class Map extends React.Component {

  constructor(props) {
    super(props);
    // If layersData exists, we will instance a layersSpec collection
    if (props.layersData) {
      this.layersSpec = new LayersSpecCollection(props.layersData);
      this.layersSpec.instanceLayers();
    }
  }

  /**
   * When DOM exists create map and add layers
   */
  componentDidMount() {
    this.mapView = new MapView({
      el: this.refs.MapElement,
      options: this.props.mapOptions,
      layersSpec: this.layersSpec
    });
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

  setView(center, zoom) {
    this.mapView.map.setView(center, zoom || this.map.getZoom());
  }

}

Map.propTypes = {
  layersData: React.PropTypes.array, // JSON array
  mapOptions: React.PropTypes.object,
  legend: React.PropTypes.bool
};

Map.defaultProps = {
  mapOptions: MapView.prototype.defaults,
  legend: true
};

export default Map;
