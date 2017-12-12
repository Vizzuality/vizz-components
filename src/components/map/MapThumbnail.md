Map thumbnail for Carto layers:

```js
const { WRIAPISerializer } = require('helpers/rw-api-serializer');
const layerSpec = require('mocks/carto-layer-spec.json');
<MapThumbnail width={300} height={250} layerSpec={WRIAPISerializer(layerSpec)} />
```

Map thumbnail for ESRI layers:
```js
const { WRIAPISerializer } = require('helpers/rw-api-serializer');
const layerSpec = require('mocks/esri-layer-spec.json');
<MapThumbnail width={300} height={250} layerSpec={WRIAPISerializer(layerSpec)} />
```
