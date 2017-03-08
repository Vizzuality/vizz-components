import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Globe from '../components/Globe';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import RadioGroup from '../components/Form/RadioGroup';
import CheckboxGroup from '../components/Form/CheckboxGroup';
import SvgIcon from '../components/SvgIcon';
import GlobeComponent from '../components/Globe';

import '../components/Globe/style.scss';
import earthImage from '../components/Globe/images/earth-min.jpg';
import earthBumpImage from '../components/Globe/images/earth-bump.jpg';
import cloudsImage from '../components/Globe/images/clouds.png';

storiesOf('UI Components', module)
.add('Modal', () => (
  <Modal
  visibility
  hasFooter
  >
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </Modal>
))
.add('Spinner', () => (
  <Spinner color="black" />
))
.add('SvgIcon', () => {
  const sprite = (
    <svg style={{ position: 'absolute', overflow: 'hidden', height: 0, width: 0 }}>
      <defs>
        <symbol id="icon-eye" viewBox="0 0 24 24">
          <title>eye</title>
          <path className="path1" d="M12 4.5c-6.628 0-12 7.5-12 7.5s5.372 7.5 12 7.5 12-7.5 12-7.5-5.372-7.5-12-7.5zM12 16.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zM12 9c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z">
          </path>
        </symbol>
      </defs>
    </svg>
  );

  return (
    <div>
      {sprite}
      <SvgIcon name="icon-eye" className="foo-bar" />
    </div>
  );
});

storiesOf('Form Components', module)
  .add('CheckboxGroup', () => {
    const checkboxOptions = [
      { value: 'optimistic', label: 'Optimistic' },
      { value: 'pesimistic', label: 'Pesimistic' },
      { value: 'business', label: 'Business as usual' }
    ];
    return (
      <CheckboxGroup
        items={checkboxOptions}
        name="checkbox-name"
        defaultValue={['optimistic']}
        className=""
        onChange={(selected) => {
          console.info(selected);
        }}
      />
    );
  })
  .add('RadioGroup', () => {
    const radioOptions = [
      { value: 'optimistic', label: 'Optimistic' },
      { value: 'pesimistic', label: 'Pesimistic' },
      { value: 'business', label: 'Business as usual' }
    ];
    return (
      <RadioGroup
        items={radioOptions}
        name="radio-name"
        defaultValue="optimistic"
        className=""
        onChange={(selected) => {
          console.info(selected);
        }}
      />
    );
  });

storiesOf('Visualisations', module)
  .add('Globe 3D', () => (
    <GlobeComponent
      className="vizz-component-globe"
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
      lightPosition={'right'}
      />
  ));
