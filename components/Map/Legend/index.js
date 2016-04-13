'use strict';

import './style.css';
import _ from 'underscore';
import React from 'react';
import LegendItem from './LegendItem';

class Legend extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      layersSpec: props.layersSpec
    };
    this.layersSpec = props.layersSpec;
  }

  updateLayersSpec(params) {
    const layerSpec = this.layersSpec.find({ name: params.name });
    if (layerSpec) {
      layerSpec.set({ active: params.active });
    }
  }

  render() {
    const legendItems = _.map(this.layersSpec.models, (layerSpec, i) => {
      return (
        <LegendItem
          key={ i }
          name={ layerSpec.attributes.name }
          active={ layerSpec.attributes.active }
          onChange={ this.updateLayersSpec.bind(this) } />
      );
    });
    return (
      <div className="legend-component">
        <ul>
          { legendItems }
        </ul>
      </div>
    );
  }

}

export default Legend;
