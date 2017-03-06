import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import GlobeComponent from '../components/Globe/index.jsx';

import '../components/Globe/style.scss';
import earthImage from '../components/Globe/images/earth.jpg';
import earthBumpImage from '../components/Globe/images/earth-bump.jpg';
import cloudsImage from '../components/Globe/images/clouds.png';


storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('GlobeComponent', module)
.add('Default Globe', () => (
  <GlobeComponent
    earthImagePath={earthImage}
    earthBumpImagePath={earthBumpImage}
    defaultLayerImagePath={cloudsImage}
    useDefaultLayer={true}
    useHalo={true}
    enableZoom={true}
    pointLightColor={0xcccccc}
    ambientLightColor={0x444444}
    segments={64}
    rings={64}
    />
));
