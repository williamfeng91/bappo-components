import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';

import VerticalSeparator from '..';

test('should render a vertical separator', () => {
  const { getByTestId } = render(<VerticalSeparator testID="test" />);
  expect(getByTestId('test')).toMatchInlineSnapshot(`
    .c0 {
      -webkit-align-items: stretch;
      -webkit-box-align: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;
      border-color: #191E26;
      border-style: solid;
      border-width: 0;
      box-sizing: border-box;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-flex: 0;
      -webkit-flex-grow: 0;
      -ms-flex-positive: 0;
      flex-grow: 0;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      position: relative;
      min-height: 0;
      min-width: 0;
    }

    .c1 {
      border-width: 0px;
      border-style: solid;
      border-left-width: 1px;
      border-left-color: rgba(0,0,0,0.12);
      margin-left: 8px;
      margin-right: 8px;
    }

    <div
      class="c0 c1"
      data-testid="test"
    />
  `);
});
