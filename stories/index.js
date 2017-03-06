import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import GlobeComponent from '../components/Globe/index.jsx';


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
    earthImagePath="./images/earth-min.jpg"
    earthBumpImagePath="./images/earth-bump.jpg"/>
));
