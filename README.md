# Vizzuality components

**DEPRECATED: This library is not longer maintained.

Vizzuality components is a collection of React components that we use in our projects.

## Components

* [Globe](./components/Globe): A 3D earth with controls, zoom and animation. It uses WebGL and three.js.
* [Spinner](./components/Spinner): Spinner is a Icon that, well, spins.

## How to use

You need to have configured nodejs and npm before, then you can install using this command:

```bash
npm install --save vizz-components
```

Example using ES6:

```js
import React from 'react';
import { Spinner } from 'vizz-components';

class MyView extends React.Component {
  render() {
    return (
      <Spinner />
    );
  }
}
```

## Contribution

If you want to contribute to this project adding new React components, just follow this simple instructions:

* Make sure you have installed [nodejs](https://nodejs.org)
* Clone this repo
* Install project dependences with `npm install`
* Create your component inside `components` directory
* Add your component story inside `stories/index.js` file
* Run the storybook with `npm start`
* Send us a pull-request with your awesome component :)

## License

Vizzuality Components is freely distributable under the terms of the [MIT license](LICENSE.md).
