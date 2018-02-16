import L from 'leaflet';
import Promise from 'bluebird';

Promise.config({
  cancellation: true
});

export default (leafletMap, layerSpec) => {
  const { layerConfig, layerIndex, visibility, opacity } = layerSpec;
  let layer;

  // Transforming data layer
  if (layerConfig.body.crs && L.CRS[layerConfig.body.crs]) {
    layerConfig.body.crs = L.CRS[layerConfig.body.crs.replace(':', '')];
    layerConfig.body.pane = 'tilePane';
  }

  return new Promise((resolve, reject) => {
    switch (layerConfig.type) {
      case 'wms':
        layer = L.tileLayer.wms(layerConfig.url, layerConfig.body);
        break;
      case 'tileLayer':
        if (JSON.stringify(layerConfig.body).indexOf('style: "function') >= 0) {
          layerConfig.body.style = eval(`(${layerConfig.body.style})`);
        }
        layer = L.tileLayer(layerConfig.url, layerConfig.body);
        break;
      default:
        reject('"type" specified in layer spec doesn`t exist');
    }

    if (layer) {
      layer.setZIndex(layerIndex);

      // If visibility is enabled, set opacity to zero
      if (visibility) {
        layer.setOpacity(opacity);
      } else {
        layer.setOpacity(0);
      }

      return resolve(layer);

      // layer.on('tileload', () => resolve(layer));
      // layer.on('tileerror', err => reject(err));

      // // adding map
      // leafletMap.addLayer(layer);

      // // removing layer before resolve
      // onCancel(() => leafletMap.removeLayer(layer));
    }

    return reject();
  });
};
