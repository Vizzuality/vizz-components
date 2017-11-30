Legend example:

```js
const { data } = require('mocks/layers-spec');
const layersSpec = data.map(({ id, attributes }) => Object.assign({}, { id }, attributes));

<LegendControl layersSpec={layersSpec} position="bottomright" />
```
