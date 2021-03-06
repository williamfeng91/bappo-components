import React from 'react';

import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  WebLink,
  storiesOf,
} from '../../../ui-explorer';
import { url } from '../../../url';
import DependentField from './examples/DependentField';
import FieldLevelValidation from './examples/FieldLevelValidation';
import Minimal from './examples/Minimal';
import PropSubmitButtonText from './examples/PropSubmitButtonText';
import ShowHideFieldBasedOnFormState from './examples/ShowHideFieldBasedOnFormState';

const ModalFormScreen = () => (
  <UIExplorer title="ModalForm" url="2-components/ModalForm">
    <WebLink href={`${url}/src/components/ModalForm`} text="Source Code" />

    <Description>
      <AppText>Form in a modal.</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="?React.Node | ((formState: FormStateAndHelpersAndActions) => React.Node)"
        description="Body of the form. Can be a React node or a render function which will receive the form state as argument."
      />

      <DocItem
        name="initialValues?"
        typeInfo="mixed"
        description={
          <AppText>
            Initial values of the form. It should be in the format of{' '}
            <Code>
              {JSON.stringify({ field1: 'value1', field2: 'value2' })}
            </Code>
          </AppText>
        }
      />

      <DocItem
        name="onSubmit?"
        typeInfo="(values: mixed) => void"
        description="Function to be called when form is submitted."
      />

      <DocItem
        name="onCancel?"
        typeInfo="(values: mixed) => void"
        description="Function to be called when form is canceled."
      />

      <DocItem
        name="submitButtonText?"
        typeInfo="string | (formState: FormStateAndHelpers) => string"
        description="Submit button text. Can be a string or a function that returns a string. The function will be called with the form state."
        example={{
          render: () => <PropSubmitButtonText />,
        }}
      />
    </Section>

    <Section title="Examples">
      <WebLink
        href={`${url}/storybook/storybook-native/storybook/stories/2-components/ModalForm/examples`}
        text="Examples Code"
      />
      <DocItem
        description="Minimal"
        example={{
          render: () => <Minimal />,
        }}
      />
      <DocItem
        description="Field-level validation"
        example={{
          render: () => <FieldLevelValidation />,
        }}
      />
      <DocItem
        description="Dependent Field"
        example={{
          render: () => <DependentField />,
        }}
      />
      <DocItem
        description="Show/Hide field based on form state"
        example={{
          render: () => <ShowHideFieldBasedOnFormState />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('ModalForm', ModalFormScreen);
