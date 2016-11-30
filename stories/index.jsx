import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Globe from '../components/Globe';
import Spinner from '../components/Spinner';

storiesOf('UI Components', module)
  .add('Spinner', () => (
    <Spinner color="black" />
  ));

storiesOf('Visualisations', module)
  .add('Globe 3D', () => (
    <Globe />
  ));
