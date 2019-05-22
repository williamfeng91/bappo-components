// @flow

import * as React from 'react';
import invariant from 'fbjs/lib/invariant';
import styled, { css } from 'styled-components';
import type { TextInputProps } from './types.js.flow';

type Props = TextInputProps & {
  // Will be removed
  className?: string,
};

type State = {};

class TextInput extends React.Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
    multiline: false,
    placeholder: '',
    readOnly: false,
    type: 'text',
  };

  static displayName = 'TextInput';

  blur() {
    this._input && this._input.blur();
  }

  clear() {
    if (this._input) {
      this._input.value = '';
    }
  }

  focus() {
    this._input && this._input.focus();
  }

  state = {};

  static getDerivedStateFromProps(nextProps: Props) {
    TextInput._checkProps(nextProps);
    return null;
  }

  componentDidMount() {
    const __this = this;
    if (this.props.autoFocus) {
      setTimeout(() => __this.focus());
    }
  }

  render() {
    const {
      accessibilityLabel,
      autoComplete = 'off',
      className,
      defaultValue,
      placeholder,
      maxLength,
      multiline,
      readOnly,
      style,
      testID,
      type,
      value,
    } = this.props;

    const InputComponent = multiline ? TextArea : Input;

    const props = {
      defaultValue,
      dir: 'auto',
      innerRef: this._captureInputRef,
      maxLength,
      onBlur: this._createBlurEventHandler(),
      onChange: this._createChangeEventHandler(),
      onFocus: this._createFocusEventHandler(),
      placeholder,
      readOnly,
      type,
      value,
      'aria-label': accessibilityLabel,
      'data-testid': testID,
      autoComplete,
    };

    const styleProps = {
      className,
      multiline,
      style,
      rows: undefined,
    };

    if (multiline) styleProps.rows = 5;

    return <InputComponent {...props} {...styleProps} />;
  }

  static _checkProps(props: Props) {
    const { multiline, type } = props;

    invariant(
      !(multiline && type !== 'text'),
      'Only type="text" is supported for multiline TextInput',
    );
  }

  _input: ?(HTMLInputElement | HTMLTextAreaElement);

  _captureInputRef = (ref: ?(HTMLInputElement | HTMLTextAreaElement)) => {
    this._input = ref;
  };

  _createBlurEventHandler = () => {
    const { onBlur } = this.props;

    if (onBlur) {
      return (
        event: SyntheticFocusEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        onBlur({
          nativeEvent: {
            text: event.currentTarget.value,
          },
        });
      };
    }
    return onBlur;
  };

  _createChangeEventHandler = () => {
    const { onValueChange } = this.props;

    if (onValueChange) {
      return (
        event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        onValueChange(event.currentTarget.value);
      };
    }
    return onValueChange;
  };

  _createFocusEventHandler = () => {
    const { onFocus } = this.props;

    if (onFocus) {
      return (
        event: SyntheticFocusEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        onFocus({
          nativeEvent: {
            text: event.currentTarget.value,
          },
        });
      };
    }
    return onFocus;
  };
}

export default TextInput;

const inputStyles = css`
  appearance: none;
  background-color: transparent;
  border-color: black;
  border-radius: 0;
  border-width: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  height: ${({ multiline }) => (multiline ? 'auto' : '18px')};
  padding: 0;
  outline: none;
  resize: none;
`;

const Input = styled.input`
  ${inputStyles};
`;

const TextArea = styled.textarea`
  ${inputStyles};
  padding: 8px 0px;
`;
