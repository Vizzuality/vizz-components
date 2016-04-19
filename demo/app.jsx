'use strict';

import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../components/Map';
import Router from '../components/Router';

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

/**
 * Router definition
 */
class AppRouter extends Router {}
// Overriding default routes
AppRouter.prototype.routes = {
  'map': function() {
    console.info('you are on map');
  }
};
const router = new AppRouter();

/**
 * App definition
 */
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {

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

// Initializing app
ReactDOM.render(<App />, document.getElementById('app'));
router.start();
