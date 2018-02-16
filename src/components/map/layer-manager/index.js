import getLeafletLayer from './leaflet-layer';
import getEsriLayer from './esri-layer';
import getCartoLayer from './carto-layer';
import getGeeLayer from './gee-layer';
import getNexGDDPLayer from './nexgddp-layer';

const getLayer = (leafletMap, layerSpec) => {
  const method = {
    // legacy/deprecated
    leaflet: getLeafletLayer,
    arcgis: getEsriLayer,

    // carto
    cartodb: getCartoLayer,
    carto: getCartoLayer,

    // wms
    wmsservice: getLeafletLayer,
    wms: getLeafletLayer,

    // arcgis
    featureservice: getEsriLayer,
    mapservice: getEsriLayer,
    tileservice: getEsriLayer,
    esrifeatureservice: getEsriLayer,
    esrimapservice: getEsriLayer,
    esritileservice: getEsriLayer,

    // GEE
    gee: getGeeLayer,

    // NexGDDP
    nexgddp: getNexGDDPLayer
  }[layerSpec.provider];

  if (method) {
    return method.call(this, leafletMap, layerSpec);
  }

  return new Promise((resolve, reject) => reject(`${layerSpec.provider} provider is not yet supported.`));
};

export default getLayer;
