export const TOPICS = [
  { label: 'Cities', value: 'cities' },
  { label: 'Climate', value: 'climate' },
  { label: 'Energy', value: 'energy' },
  { label: 'Forests', value: 'forests' },
  { label: 'Food', value: 'food' },
  { label: 'Land classification', value: 'land_classification' },
  { label: 'Society', value: 'society' },
  { label: 'Supply chain', value: 'supply_chain' },
  { label: 'Water', value: 'water' }
];

export const PROVIDERS = [
  { label: 'Carto', value: 'cartodb' },
  { label: 'ArcGIS', value: 'arcgis' },
  { label: 'WMS', value: 'wms' },
  { label: 'CSV', value: 'csv' },
  { label: 'Google Earth Engine', value: 'gee' }
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

export const STATE_DEFAULT = {
  step: 1,
  stepLength: 2,
  submitting: false,
  loading: false,
  form: {
    authorization: '',
    // STEP 1
    name: '',
    subtitle: '',
    application: [],
    topics: [],
    tags: [],
    provider: '',
    connectorProvider: '',
    connectorType: '',
    connectorUrlHint: '',

    // STEP 2
    connectorUrl: '',
    legend: {
      lat: null,
      long: null,
      date: [],
      country: []
    }
  }
};
