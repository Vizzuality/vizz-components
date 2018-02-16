import L from 'leaflet';
import Promise from 'bluebird';

Promise.config({
  cancellation: true
});

export default (leafletMap, layerSpec) => {
  const { id, layerIndex, opacity, visibility } = layerSpec;
  const tileUrl = `${config.apiUrlRW}/layer/${id}/tile/gee/{z}/{x}/{y}`;
  const layer = L.tileLayer(tileUrl);

  layer.setZIndex(layerIndex);

  // If visibility is enabled, set opacity to zero
  if (visibility) {
    layer.setOpacity(opacity);
  } else {
    layer.setOpacity(0);
  }

  // adding map
  // leafletMap.addLayer(layer);

  return new Promise((resolve, reject) => {
    if (layer) return resolve(layer);
    return reject();

    // layer.on('tileload', () => resolve(layer));
    // layer.on('tileerror', err => reject(err));

    // removing layer before resolve
    // onCancel(() => leafletMap.removeLayer(layer));
  });
};
