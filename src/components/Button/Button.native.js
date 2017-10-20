// @flow

import * as React from 'react';
import RN from 'react-native';

type Props = {
  children?: React.Node,
  /**
   * Delay in ms, from onPressIn, before onLongPress is called. Default is 500ms.
   */
  delayLongPress?: number,
  /**
   * If true, disable all interactions for this component.
   */
  disabled?: boolean,
  onLongPress?: () => void,
  onPress?: () => void,
  onPressIn?: () => void,
  onPressOut?: () => void,
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
};

class Button extends React.Component<Props> {
  props: Props;

  static defaultProps = {
    delayLongPress: 500,
    disabled: false,
  };

  static displayName = 'Button';

  render() {
    const {
      children,
      delayLongPress,
      disabled,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      style,
      testID,
    } = this.props;

    const props = {
      delayLongPress,
      disabled,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      style,
      testID,
    };

    return (
      <RN.TouchableOpacity
        {...props}
      >
        {children}
      </RN.TouchableOpacity>
    );
  }
}

export default Button;
