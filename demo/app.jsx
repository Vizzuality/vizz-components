'use strict';

import './style.css';

import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../components/Map';
import Router from '../components/Router';
import layersData from './layerSpec.json';

const mapOptions = {
  center: [40, -3], // [lat, lng]
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
    this.state = {};
  }

  componentWillMount() {
    router.start();
    this.setState(router.params.attributes);
    router.on('route', () => {
      this.setState(router.params.attributes);
    });
  }

  updateRouter() {
    const params = this.refs.Map.state;
    router.update(params);
  }

  render() {
    // Getting params from router before render map
    // TODO: make better this
    const center = this.state.lat && this.state.lng ?
      [this.state.lat, this.state.lng] : null;
    const options = _.extend({}, mapOptions, {
      center: center || mapOptions.center,
      zoom: router.params.get('zoom') || mapOptions.zoom
    });
    return (
      <div>
        <section className="l-map">
          <Map ref="Map"
            mapOptions={ options }
            layersData={ layersData }
            onLoad={ this.updateRouter.bind(this) }
            onChange={ this.updateRouter.bind(this) } />
        </section>
      </div>
    );
  }

}

// Initializing app
ReactDOM.render(<App />, document.getElementById('app'));
