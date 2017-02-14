import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Globe from '../components/Globe';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import RadioGroup from '../components/Form/RadioGroup';
import CheckboxGroup from '../components/Form/CheckboxGroup';
import SvgIcon from '../components/SvgIcon';
import DatasetForm from '../components/API/DatasetForm';
import DatasetList from '../components/API/DatasetList';
import WidgetForm from '../components/API/WidgetForm';
import WidgetList from '../components/API/WidgetList';
import LayerForm from '../components/API/LayerForm';
import LayerList from '../components/API/LayerList';


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
          <path className="path1" d="M12 4.5c-6.628 0-12 7.5-12 7.5s5.372 7.5 12 7.5 12-7.5 12-7.5-5.372-7.5-12-7.5zM12 16.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zM12 9c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
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
    <Globe />
  ));


storiesOf('API modules', module)
  .add('Dataset Form', () => (
    <DatasetForm
      api="https://api.resourcewatch.org"
      application={['rw']}
      authorization=""
      // dataset="f3d6d6c1-3b3b-4dfc-a2a0-dcf38d258ae9"
    />
  ))
  .add('Dataset List', () => (
    <DatasetList
      api="https://api.resourcewatch.org"
      application={['rw']}
      url="/dataset"
    />
  ))
  .add('Widget Form', () => (
    <WidgetForm
      api="https://api.resourcewatch.org"
      application={['rw']}
      authorization=""
      dataset="89a6358e-27eb-4b9c-9f0d-befc4959f914"
      widget="61628091-8679-4db8-bc47-851c51784f32"
    />
  ))
  .add('Widget List', () => (
    <WidgetList
      api="https://api.resourcewatch.org"
      application={['rw']}
      path="widget"
      // dataset="25b0ab35-0865-42f8-9b02-24870d0c4e82"
    />
  ))
  .add('Layer Form', () => (
    <LayerForm
      api="https://api.resourcewatch.org"
      application={['rw']}
      authorization=""
      dataset="b7bf012f-4b8b-4478-b5c9-6af3075ca1e4"
      layer="7a46cc6f-a54d-4385-be60-46a18c437a3b"
    />
  ))
  .add('Layer List', () => (
    <LayerList
      api="https://api.resourcewatch.org"
      application={['rw']}
      path="layer"
      // dataset="b7bf012f-4b8b-4478-b5c9-6af3075ca1e4"
    />
  ));
