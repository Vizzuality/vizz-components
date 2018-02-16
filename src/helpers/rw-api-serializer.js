import isArray from 'lodash/isArray';

const serialize = ({ id, type, attributes }) => Object.assign({}, { id, type }, attributes);

const itemSerializer = ({ id, type, attributes }) => {
  const d = Object.assign({}, { id, type }, attributes);

  if (d.widget) d.widget = d.widget.map(serialize);
  if (d.layer) d.layer = d.layer.map(serialize);
  if (d.metadata) d.metadata = d.metadata.map(serialize);
  if (d.vocabulary) d.vocabulary = d.vocabulary.map(serialize);
  if (d.legendConfig && d.legendConfig.items) {
    d.legendConfig.items = d.legendConfig.items.map((item, index) => {
      const i = Object.assign({}, item);
      i.id = i.id || index;
      return i;
    });
  }

  return d;
};

export const wriAPISerializer = ({ data }) => {
  if (data && isArray(data)) return data.map(itemSerializer);
  return itemSerializer(data);
};

export default wriAPISerializer;
