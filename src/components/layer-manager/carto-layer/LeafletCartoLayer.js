import React from 'react';
import LayerGroup from 'react-leaflet/lib/LayerGroup';
import TileLayer from 'react-leaflet/lib/TileLayer';
import GridLayer from 'react-leaflet/lib/GridLayer';

export default () => (
  <LayerGroup>
    <TileLayer />
    <GridLayer />
  </LayerGroup>
);
