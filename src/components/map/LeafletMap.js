import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Promise from 'bluebird';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import LoadingSpinner from 'components/Loading/LoadingSpinner';
import layerManager from './layer-manager';

Promise.config({
  warnings: true,
  cancellation: true,
  monitoring: true
});

const defaultMapOptions = {
  zoom: 3,
  center: [48.46038, -123.889823],
  zoomControl: false,
  zoomControlPosition: 'bottomright',
  minZoom: 2
};

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.addedLayers = []; // cached layers
    this.triggerChange = this.triggerChange.bind(this);
    this.addLayers = debounce(this.addLayers.bind(this), 300);
  }

  componentDidMount() {
    this.initMap();
    this.setEvents();
    this.setBasemap();
    this.setLabels();
    this.setBoundaries();
    this.setWater();
    this.toggleLayers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.basemap !== this.props.basemap) this.setBasemap();
    if (prevProps.labels !== this.props.labels) this.setLabels();
    if (prevProps.boundaries !== this.props.boundaries) this.setBoundaries();
    if (prevProps.water !== this.props.water) this.setWater();
    if (prevProps.bbox !== this.props.bbox) this.setBounds();
    if (!isEqual(prevProps.layers, this.props.layers)) this.toggleLayers();
  }

  componentWillUnmount() {
    this.map.off('zoomend');
    this.map.off('moveend');
  }

  setEvents() {
    if (this.props.onChange && typeof this.props.onChange === 'function') {
      this.map.on('zoomend', this.triggerChange);
      this.map.on('moveend', this.triggerChange);
    }
  }

  setBasemap() {
    if (this.basemap) this.map.removeLayer(this.basemap);
    const { basemap } = this.props;
    if (basemap) {
      this.basemap = L.tileLayer(basemap.value, { ...basemap.options, zIndex: 0 });
      this.map.addLayer(this.basemap);
    }
  }

  setLabels() {
    if (this.labels) this.map.removeLayer(this.labels);
    const { labels } = this.props;
    if (labels) {
      this.labels = L.tileLayer(labels.value, { ...labels.options, zIndex: 10002 });
      this.map.addLayer(this.labels);
    }
  }

  setBoundaries() {
    if (this.boundaries) this.map.removeLayer(this.boundaries);
    const { boundaries } = this.props;
    if (boundaries && Object.keys(boundaries).length) {
      this.boundaries = L.tileLayer(boundaries.value, { ...boundaries.options, zIndex: 10001 });
      this.map.addLayer(this.boundaries);
    }
  }

  setWater() {
    if (this.water) this.map.removeLayer(this.water);
    const { water } = this.props;
    if (water) {
      this.water = L.tileLayer(water.value, { ...water.options, zIndex: 10002 });
      this.map.addLayer(this.water);
    }
  }

  setBounds() {
    const { bbox, sidebar } = this.props;

    if (bbox) {
      const bounds = [
        [bbox[1], bbox[0]],
        [bbox[3], bbox[2]]
      ];

      const left = (sidebar.open) ? 430 : 0;

      this.map.fitBounds(bounds, {
        paddingTopLeft: [left + 32, 32], // Padding Left Top... Leaflet? What the hell??
        paddingBottomRight: [32, 32]
      });
    }
  }

  triggerChange() {
    const center = this.map.getCenter();
    this.props.onChange({ zoom: this.map.getZoom(), lat: center.lat, lng: center.lng });
  }

  initMap() {
    const mapOptions = Object.assign({}, defaultMapOptions, this.props.mapOptions);
    this.map = L.map(this.mapElement, mapOptions);
    if (!mapOptions.zoomControl) L.control.zoom({ position: mapOptions.zoomControlPosition }).addTo(this.map);
  }

  removeAllLayers() {
    if (this.addedLayers.length) {
      this.addedLayers.forEach(layer => this.map.removeLayer(layer));
      this.addedLayers = [];
    }
  }

  addLayers() {
    this.setState({ loading: true });

    // Cleaning all layers before add the new ones
    // TODO: cached layers instead remove all layers everytime
    this.removeAllLayers();

    if (this.layersRequest) this.layersRequest.cancel();

    const promises = this.props.layers.map(layerSpec => layerManager(this.map, layerSpec));

    this.layersRequest = Promise.all(promises)
      .then((layers) => {
        this.removeAllLayers();
        this.addedLayers = layers;
        this.addedLayers.forEach(layer => this.map.addLayer(layer));
      }).catch((reason) => {
        console.error(reason);
      }).finally(() => {
        if (!this.layersRequest.isCancelled()) this.setState({ loading: false });
      });

    return this.layersRequest;
  }

  toggleLayers() {
    if (this.layersRequest) this.layersRequest.cancel();
    // Executing debounced add layers
    this.addLayers();
  }

  render() {
    return (
      <div className="map" ref={(el) => { this.mapElement = el; }}>
        {this.state.loading && <LoadingSpinner />}
        { this.props.children }
      </div>
    );
  }
}

Map.propTypes = {
  mapOptions: PropTypes.object,
  basemap: PropTypes.object,
  labels: PropTypes.object,
  water: PropTypes.object,
  boundaries: PropTypes.object,
  bbox: PropTypes.any,
  sidebar: PropTypes.object,
  children: PropTypes.any,
  layers: PropTypes.array,
  onChange: PropTypes.func
};

Map.defaultProps = {};

export default Map;
