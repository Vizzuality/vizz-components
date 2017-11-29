Legend example:

```js
const { data } = require('mocks/layers-spec');
const layersSpec = data.map(({ id, attributes }) => Object.assign({}, { id }, attributes));
console.log(layersSpec);
<LegendControl layersSpec={layersSpec} position="bottomright" />
```
