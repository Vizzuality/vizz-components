import React from 'react';
import LayerGroup from 'react-leaflet/lib/LayerGroup';
import CartoLayer from './carto-layer/LeafletCartoLayer';

export default () => (
  <LayerGroup>
    <CartoLayer />
  </LayerGroup>
);
