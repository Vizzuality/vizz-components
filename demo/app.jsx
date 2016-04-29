'use strict';

import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../components/Map';
import Router from '../components/Router';
import layersData from './layerSpec.json';

const mapOptions = {
  center: [40, -3],
  zoom: 3,
  basemapSpec: {
    url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    options: {
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    	subdomains: 'abcd',
    	maxZoom: 19
    }
  }
};

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
    // router.params.on('change', this.updateMap.bind(this));
    // this.refs.Map.mapView.map.on('moveend', this.updateRouter.bind(this));
  }

  updateRouter() {
    // const map = this.refs.Map.mapView.map;
    // const center = map.getCenter();
    // const params = { lat: center.lat, lng: center.lng, zoom: map.getZoom() };
    // router.update(params);
  }

  updateMap() {
    // const center = [router.params.get('lat'), router.params.get('lng')];
    // this.refs.Map.setView(center, router.params.get('zoom'));
  }

  render() {
    return (
      <div>
        <section className="l-map">
          <Map ref="Map"
            mapOptions={ mapOptions }
            layersData={ layersData } />
        </section>
      </div>
    );
  }

}

// Initializing app
ReactDOM.render(<App />, document.getElementById('app'));
router.start();
