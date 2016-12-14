import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Globe from '../components/Globe';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import RadioGroup from '../components/Form/RadioGroup';
import CheckboxGroup from '../components/Form/CheckboxGroup';


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
));

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
    <Globe />
  ));
