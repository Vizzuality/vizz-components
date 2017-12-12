const serialize = ({ id, type, attributes }) => Object.assign({}, { id, type }, attributes);

export const WRIAPIItemParser = (data) => {
  const { id, type, attributes } = data;
  const d = Object.assign({}, { id, type }, attributes);
  if (d.widget) d.widget = d.widget.map(serialize);
  if (d.layer) d.layer = d.layer.map(serialize);
  if (d.metadata) d.metadata = d.metadata.map(serialize);
  if (d.legendConfig && d.legendConfig.items) {
    d.legendConfig.items = d.legendConfig.items.map((item, index) => {
      const i = Object.assign({}, item);
      i.id = i.id || index;
      return i;
    });
  }
  return d;
};

export const WRIAPISerializer = ({ data }) => {
  if (data instanceof Array) return data.map(WRIAPIItemParser);
  return WRIAPIItemParser(data);
};

export default WRIAPISerializer;
