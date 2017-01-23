export const TOPICS = [
  { text: 'Cities', value: 'cities' },
  { text: 'Climate', value: 'climate' },
  { text: 'Energy', value: 'energy' },
  { text: 'Forests', value: 'forests' },
  { text: 'Food', value: 'food' },
  { text: 'Land classification', value: 'land_classification' },
  { text: 'Society', value: 'society' },
  { text: 'Supply chain', value: 'supply_chain' },
  { text: 'Water', value: 'water' }
];

export const PROVIDERS = [
  { text: 'Carto', value: 'cartodb' },
  { text: 'ArcGIS', value: 'arcgis' },
  { text: 'WMS', value: 'wms' },
  { text: 'CSV', value: 'csv' },
  { text: 'Google Earth Engine', value: 'gee' }
];

export const PROVIDER_DICTIONARY = {
  csv: {
    provider: 'csv',
    connectorProvider: 'csv',
    connectorType: 'document',
    connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27 ."ftjson" param is required in the url'
  },
  json: {
    provider: 'json',
    connectorProvider: 'rwjson',
    connectorType: 'json',
    connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27 ."ftjson" param is required in the url'
  },
  gee: {
    provider: 'gee',
    connectorProvider: 'gee',
    connectorType: 'rest',
    connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27 ."ftjson" param is required in the url'
  },
  cartodb: {
    provider: 'cartodb',
    connectorProvider: 'cartodb',
    connectorType: 'rest',
    connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27 ."ftjson" param is required in the url'
  },
  arcgis: {
    provider: 'arcgis',
    connectorProvider: 'featureservice',
    connectorType: 'rest',
    connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27 ."ftjson" param is required in the url'
  },
  wms: {
    provider: 'wms',
    connectorProvider: null,
    connectorType: null,
    connectorUrlHint: 'Example: https://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20combined01_prepared%20where%20impactparameter=%27Food Demand%27 ."ftjson" param is required in the url'
  }
};
