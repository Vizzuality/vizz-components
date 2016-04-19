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
  '': function() {
    console.info('you are on welcome');
  },
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

  componentDidMount() {
    this.setListeners();
  }

  setListeners() {
    router.params.on('change', this.updateMap.bind(this));
    this.refs.Map.mapView.map.on('moveend', this.updateRouter.bind(this));
  }

  updateRouter() {
    const map = this.refs.Map.mapView.map;
    const center = map.getCenter();
    const params = { lat: center.lat, lng: center.lng, zoom: map.getZoom() };
    router.update(params);
  }

  updateMap() {
    const center = [router.params.get('lat'), router.params.get('lng')];
    this.refs.Map.setView(center, router.params.get('zoom'));
  }

  render() {
    var mapOptions = {
      center: [router.params.get('lat'), router.params.get('lng')],
      zoom: router.params.get('zoom')
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
