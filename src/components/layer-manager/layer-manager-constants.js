export const providers = {
  // legacy/deprecated
  leaflet: 'this.addLeafletLayer',
  arcgis: 'this.addEsriLayer',
  // carto
  cartodb: 'this.addCartoLayer',
  carto: 'this.addCartoLayer',
  // wms
  wmsservice: 'this.addLeafletLayer',
  wms: 'this.addLeafletLayer',
  // arcgis
  featureservice: 'this.addEsriLayer',
  mapservice: 'this.addEsriLayer',
  tileservice: 'this.addEsriLayer',
  esrifeatureservice: 'this.addEsriLayer',
  esrimapservice: 'this.addEsriLayer',
  esritileservice: 'this.addEsriLayer',
  // geojson
  geojson: 'this.addGeoJsonLayer',
  // GEE
  gee: 'this.addGeeLayer',
  nexgddp: 'this.addNexGDDPLayer'
};

export default { providers };
