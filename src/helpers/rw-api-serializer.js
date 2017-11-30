const serialize = ({ id, type, attributes }) => Object.assign({}, { id, type }, attributes);

export const WRIAPISerializer = ({ data }) => data.map(({ id, type, attributes }) => {
  const d = Object.assign({}, { id, type }, attributes);

  if (d.widget) d.widget = d.widget.map(serialize);
  if (d.layer) d.layer = d.layer.map(serialize);
  if (d.metadata) d.metadata = d.metadata.map(serialize);

  return d;
});

export default WRIAPISerializer;
