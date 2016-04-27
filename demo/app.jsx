'use strict';

import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../components/Map';
import Router from '../components/Router';

const torqueCSS = [
  'Map {',
  '-torque-time-attribute: "date";',
  '-torque-aggregation-function: "count(cartodb_id)";',
  '-torque-frame-count: 760;',
  '-torque-animation-duration: 15;',
  '-torque-resolution: 2',
  '}',
  '#layer {',
  '  marker-width: 3;',
  '  marker-fill-opacity: 0.8;',
  '  marker-fill: #FEE391; ',
  '  comp-op: "lighten";',
  '  [value > 2] { marker-fill: #FEC44F; }',
  '  [value > 3] { marker-fill: #FE9929; }',
  '  [value > 4] { marker-fill: #EC7014; }',
  '  [value > 5] { marker-fill: #CC4C02; }',
  '  [value > 6] { marker-fill: #993404; }',
  '  [value > 7] { marker-fill: #662506; }',
  '  [frame-offset = 1] { marker-width: 10; marker-fill-opacity: 0.05;}',
  '  [frame-offset = 2] { marker-width: 15; marker-fill-opacity: 0.02;}',
  '}'
].join('\n');;

const layersData = [
  {
    name: 'Border countries',
    account: 'simbiotica',
    type: 'cartodb',
    sql: 'select * from world_borders',
    cartocss: '#world_borders_1 {polygon-fill: #ff0000; polygon-opacity: 0.5;}',
    active: true
  },
  {
    name: 'Torque sample',
    account: 'careusa',
    type: 'torque',
    tablename: 'donors',
    cartocss: torqueCSS,
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
