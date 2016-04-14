'use strict';

import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../components/Map';

const layersData = [
  {
    name: 'Border countries',
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

  render() {
    var mapOptions = {
      center: [40, -3],
      zoom: 5
    };
    return (
      <div>
        <section>
          <h2>Map component</h2>
          <Map ref="Map" mapOptions={ mapOptions } layersData={ layersData } />
        </section>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
