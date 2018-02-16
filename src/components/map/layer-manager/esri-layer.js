import L from 'leaflet';
import 'esri-leaflet';
import Promise from 'bluebird';
import leafletLayer from './leaflet-layer';

Promise.config({
  cancellation: true
});

export default (leafletMap, layerSpec) => {
  const { layerConfig, layerIndex, visibility, opacity } = layerSpec;

  // Transforming layer
  const bodyStringified = JSON.stringify(layerConfig.body || {})
    .replace(/"mosaic-rule":/g, '"mosaicRule":')
    .replace(/"mosaic_rule":/g, '"mosaicRule":')
    .replace(/"use-cors":/g, '"useCors":')
    .replace(/"use_cors":/g, '"useCors":');

  if (L[layerConfig.type]) return leafletLayer();

  return new Promise((resolve, reject, onCancel) => {
    const layerOptions = JSON.parse(bodyStringified);

    if (!L.esri[layerConfig.type]) return reject('"type" specified in layer spec doesn`t exist');

    layerOptions.pane = 'tilePane';
    layerOptions.useCors = true; // forcing cors
    if (layerOptions.style &&
      layerOptions.style.indexOf('function') >= 0) {
      layerOptions.style = eval(`(${layerOptions.style})`);
    }

    const layer = L.esri[layerConfig.type](layerOptions);

    if (layer) {
      layer.on('load', () => {
        const layerElement = leafletMap.getPane('tilePane').lastChild;
        layerElement.style.zIndex = layerIndex;
        // If visibility is enabled, set opacity to zero
        if (visibility) {
          layerElement.style.opacity = opacity;
        } else {
          layerElement.style.opacity = 0;
        }
      });

      layer.on('requesterror', err => console.error(err));

      resolve(layer);
    } else {
      reject();
    }

    return layer;
  });
};
