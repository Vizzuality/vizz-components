'use strict';

import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../components/Map';
import LayersSpec from '../components/Map/LayersSpecCollection';

const layersData = [
  {
    account: 'simbiotica',
    type: 'cartodb',
    sql: 'select * from world_borders',
    cartocss: '#world_borders_1 {polygon-fill: #ff0000; polygon-opacity: 0.5;}',
    active: true
  }
];

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Create layers collection
    this.layers = new LayersSpec(layersData);
    // Create layers instances, it depends on his type
    this.layers.instanceLayers();
  }

  render() {
    var mapOptions = {
      center: [40, -3],
      zoom: 5
    };
    return (
      <div>
        <section>
          <h2>Map component</h2>
          <Map ref="Map" mapOptions={ mapOptions } layersSpec={ this.layers } />
        </section>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
