// @flow

/* eslint-disable react/prefer-stateless-function */

import * as React from 'react';
import styled from 'styled-components';
import type {
  ViewLayoutEvent,
} from '../../../events.js.flow';
import ViewBase from './ViewBase';

type Props = {
  children?: React.Node,
  className?: string,
  onLayout?: (event: ViewLayoutEvent) => void,
  /**
   * Controls whether the View can be the target of touch events.
   *
   * - 'auto': The View can be the target of touch events.
   * - 'none': The View is never the target of touch events.
   * - 'box-none': The View is never the target of touch events but it's subviews can be.
   * - 'box-only': The view can be the target of touch events but it's subviews cannot be.
   */
  pointerEvents: 'auto' | 'none' | 'box-none' | 'box-only',
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
};

class View extends React.Component<Props> {
  props: Props;

  static displayName = 'View';

  render() {
    const {
      children,
      className,
      onLayout,
      pointerEvents,
      style,
      testID,
    } = this.props;

    const styleProps = {
      className,
      pointerEvents,
      style,
    };

    return (
      <StyledViewBase
        {...styleProps}
        onLayout={onLayout}
        testID={testID}
      >
        {children}
      </StyledViewBase>
    );
  }
}

export default View;

const pointerEventsAuto = `
  pointer-events: auto;
`;

const pointerEventsBoxNone = `
  pointer-events: none;
  * {
    pointer-events: all;
  }
`;

const pointerEventsBoxOnly = `
  pointer-events: all;
  * {
    pointer-events: none;
  }
`;

const pointerEventsNone = `
  pointer-events: none;
  * {
    pointer-events: none;
  }
`;

const StyledViewBase = styled(ViewBase)`
  ${({ pointerEvents }) => {
    if (pointerEvents === 'auto') {
      return pointerEventsAuto;
    } else if (pointerEvents === 'none') {
      return pointerEventsNone;
    } else if (pointerEvents === 'box-none') {
      return pointerEventsBoxNone;
    } else if (pointerEvents === 'box-only') {
      return pointerEventsBoxOnly;
    }
    return '';
  }}
`;
