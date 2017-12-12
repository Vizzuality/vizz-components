import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, LayersControl } from 'react-leaflet';

class LeafletMap extends React.PureComponent {
  // componentDidMount() {
  //   const map = this.mapElement.leafletElement;
  //   console.log(map.getBounds().toBBoxString());
  // }

  render() {
    const { width, height } = this.props;
    const style = { width, height };

    return (
      <Map
        {...this.props}
        style={style}
        ref={(el) => { this.mapElement = el; }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite" checked>
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Carto">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/*<LayerManager>
          { layers.map((layerSpec) => <LayerItem layerSpec={layerSpec} />) }
        </LayerManager>*/}

        {/*<LegendControl
          controls={['visible', 'opacity', 'info', 'remove']}
          collapsed={false}
          position="bottomright"
          sortable
        >
          { layers.map((layerSpec) => <Legend layerSpec={layerSpec} />) }
        </LegendControl>*/}
      </Map>
    );
  }
}

LeafletMap.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  zoomControl: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number
};

LeafletMap.defaultProps = {
  center: [20, -20],
  zoom: 1,
  zoomControl: true,
  width: 500,
  height: 350
};

export default LeafletMap;
