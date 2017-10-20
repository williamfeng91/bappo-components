import React from 'react';
import UIExplorer, { Description, DocItem, Section, storiesOf } from '../../ui-explorer';
import PropAnimating from './examples/PropAnimating';
import PropColor from './examples/PropColor';
import PropSize from './examples/PropSize';

const ActivityIndicatorScreen = () => (
  <UIExplorer title="ActivityIndicator" url="1-components/ActivityIndicator">
    <Description>Displays a customizable activity indicator</Description>
    <Section title="Props">
      <DocItem
        name="animating?"
        typeInfo="boolean = true"
        description="Whether to show the indicator or hide it."
        example={{
          render: () => <PropAnimating />,
        }}
      />

      <DocItem
        name="color?"
        typeInfo="color = #999"
        description="The foreground color of the spinner."
        example={{
          render: () => <PropColor />,
        }}
      />

      <DocItem
        name="size?"
        typeInfo="enum('small', 'large') = 'small'"
        description="Size of the indicator. Small has a height of 20px, large has a height of 36px."
        example={{
          render: () => <PropSize />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('ActivityIndicator', ActivityIndicatorScreen);