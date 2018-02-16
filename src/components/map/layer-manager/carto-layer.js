import L from 'leaflet';
import Promise from 'bluebird';

Promise.config({
  cancellation: true
});

function makeCancellableRequest(url, bodyStringified) {
  // Don't use fetch here because xhr have abort, very useful to make a cancelable request
  return new Promise((resolve, reject, onCancel) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => resolve(xhr);
    xhr.send(bodyStringified);
    // Note the onCancel argument only exists if cancellation has been enabled!
    onCancel(() => xhr.abort());
  });
}

export default (leafletMap, layerSpec) => {
  const {
    layerConfig,
    layerIndex,
    visibility,
    opacity
  } = layerSpec;

  // Transforming layerSpec
  const bodyStringified = JSON.stringify(layerConfig.body || {})
    .replace(/"cartocss-version":/g, '"cartocss_version":')
    .replace(/"geom-column"/g, '"geom_column"')
    .replace(/"geom-type"/g, '"geom_type"')
    .replace(/"raster-band"/g, '"raster_band"');
  const url = `https://${layerConfig.account}.carto.com/api/v1/map`;

  return new Promise((resolve, reject, onCancel) => {
    const postRequest = makeCancellableRequest(url, bodyStringified);
    postRequest
      .then((res) => {
        if (res.status !== 200) reject(res);
        return JSON.parse(res.response);
      })
      .then((data) => {
        const tileUrl = `${data.cdn_url.templates.https.url}/${layerConfig.account}/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;
        const layer = L.tileLayer(tileUrl);
        layer.setZIndex(layerIndex);

        // If visibility is enabled, set opacity to zero
        if (visibility) {
          layer.setOpacity(opacity);
        } else {
          layer.setOpacity(0);
        }

        resolve(layer);

        // layer.on('tileload', () => resolve(layer));
        // layer.on('tileerror', err => reject(err));

        // adding map
        // leafletMap.addLayer(layer);

        // removing layer before resolve
        // onCancel(() => leafletMap.removeLayer(layer));
      })
      .catch(err => reject(err));
    onCancel(() => postRequest.cancel());
  });
};
