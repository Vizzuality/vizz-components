Legend example with layersSpec:

```js
const { WRIAPISerializer } = require('helpers/rw-api-serializer');
const layersSpec= require('mocks/layers-spec');

<LegendControl layersSpec={WRIAPISerializer(layersSpec)} position="bottomright" />
```


Legend example with datasetsSpec:

```js
const { WRIAPISerializer } = require('helpers/rw-api-serializer');
const datasetsSpec = require('mocks/datasets-spec');

<LegendControl datasetsSpec={WRIAPISerializer(datasetsSpec)} position="bottomright" />
```
