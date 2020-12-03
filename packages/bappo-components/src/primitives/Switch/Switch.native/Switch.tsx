import * as React from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';

import { SwitchProps } from '../types';

const Switch = React.forwardRef(
  (
    {
      accessibilityLabel,
      disabled = false,
      onBlur,
      onFocus,
      onValueChange,
      style,
      testID,
      value = false,
    }: SwitchProps,
    ref,
  ) => {
    const containerRef = React.useRef<TouchableOpacity>();

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        if (containerRef && containerRef.current) containerRef.current.focus();
      },
      blur: () => {
        if (containerRef && containerRef.current) containerRef.current.blur();
      },
    }));

    const toggleHandleLeft = React.useRef(new Animated.Value(2)).current;

    const [prevValue, setPrevValue] = React.useState(value);

    React.useEffect(() => {
      if (!!value !== !!prevValue) {
        Animated.timing(toggleHandleLeft, {
          toValue: value ? 26 : 2,
          duration: 200,
        }).start();

        setPrevValue(value);
      }
    }, [value, prevValue]);

    const _onBlur = (event: NativeSyntheticEvent<TargetedEvent>) => {
      onBlur &&
        onBlur({
          nativeEvent: {
            value,
          },
        });
    };

    const _onFocus = (event: NativeSyntheticEvent<TargetedEvent>) => {
      onFocus &&
        onFocus({
          nativeEvent: {
            value,
          },
        });
    };

    const _onKeyPress = (event: React.KeyboardEvent<TouchableOpacity>) => {
      const ENTER = 13;
      const SPACE = 32;

      if (event.which === ENTER || event.which === SPACE) {
        event.preventDefault();
        event.stopPropagation();
        _toggle();
      }
    };

    const _toggle = () => {
      !disabled && onValueChange && onValueChange(!value);
    };

    const props = {
      accessibilityLabel,
      onPress: _toggle,
      onBlur: _onBlur,
      onFocus: _onFocus,
      onKeyPress: _onKeyPress,
      testID,
    };

    const styleProps = {
      style,
      $value: !!value,
    };

    return (
      <SwitchContainer ref={containerRef as any} {...props} {...styleProps}>
        <Animated.View style={[styles.handle, { left: toggleHandleLeft }]} />
      </SwitchContainer>
    );
  },
);

export default Switch;

const SwitchContainer = styled(TouchableOpacity).attrs((props) => ({
  activeOpacity: 1,
}))<{ $value: boolean }>`
  flex: none;
  flex-direction: row;
  background-color: ${({ $value }) => ($value ? '#FF7800' : '#B0ADAB')};
  border-radius: 12px;
  height: 24px;
  width: 48px;
`;

const styles = StyleSheet.create({
  handle: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 20,
    width: 20,
    position: 'absolute',
    top: 2,
    bottom: 2,
  },
});
