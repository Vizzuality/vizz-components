import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Globe from 'components/Globe';
import Spinner from 'components/Spinner';
import RadioGroup from 'components/Form/RadioGroup';

storiesOf('UI Components', module)
  .add('Spinner', () => (
    <Spinner color="black" />
  ));

storiesOf('Form Components', module)
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
