import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, LayersControl } from 'react-leaflet';

const LeafletMap = (props) => {
  const style = {
    width: props.width,
    height: props.height
  };

  return (
    <Map
      center={[0, 0]}
      zoom={2}
      {...props}
      style={style}
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
};

LeafletMap.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  zoomControl: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number
};

LeafletMap.defaultProps = {
  center: [0, 0],
  zoom: 2,
  zoomControl: true,
  width: 500,
  height: 350
};

export default LeafletMap;
