import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Spinner from '../components/Spinner';

storiesOf('UI components', module)
  .add('Spinner', () => (
    <Spinner />
  ));
