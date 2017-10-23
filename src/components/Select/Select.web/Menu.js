// @flow

import * as React from 'react';
import { styled } from '../../../apis/Style';
import FlatList from '../../FlatList';
import Text from '../../Text';
import View from '../../View';
import type {
  Option,
  renderOptionType,
} from '../types.js.flow';
import OptionContainer from './OptionContainer';

type Props = {
  focusedOption: ?Option,
  focusedOptionRef: (ref: ?HTMLDivElement, isFocused: boolean) => void,
  getItemLayout?: (item: Option, index: number) => {
    length: number,
    offset: number,
    index: number,
  },
  labelKey: string,
  listRef: (ref: ?React.ElementRef<typeof FlatList>) => void,
  onEndReached?: ?() => void,
  onEndReachedThreshold?: ?number,
  onItemFocus: (option: Option) => void,
  onItemSelect: (option: Option) => void,
  options: Array<Option>,
  renderOption?: ?renderOptionType,
  selectedOptions: Array<Option>,
  valueKey: string,
};

const ROW_HEIGHT = 35;

class Menu extends React.Component<Props> {
  props: Props;

  render() {
    const {
      getItemLayout,
      listRef,
      onEndReached,
      onEndReachedThreshold,
      options,
    } = this.props;

    return (
      <FlatList
        data={options}
        getItemLayout={getItemLayout || this._defaultGetItemLayout}
        ref={listRef}
        keyExtractor={this._keyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        renderItem={this._renderItem}
      />
    );
  }

  _defaultGetItemLayout = (item: Option, index: number) => ({
    length: ROW_HEIGHT,
    offset: ROW_HEIGHT * index,
    index,
  });

  _defaultRenderOption = ({ option, isSelected }: {
    option: Option,
    isSelected: boolean,
  }) => (
    <Row>
      <Label
        numberOfLines={2}
        isDisabled={option.disabled}
      >
        {option[this.props.labelKey]}
      </Label>
      <SelectedIcon
        show={isSelected}
      >
        ✓
      </SelectedIcon>
    </Row>
  );

  _keyExtractor = (option: Option) => option[this.props.valueKey];

  _renderItem = ({ item: option, index }: {
    item: Option,
    index: number,
  }) => {
    const {
      focusedOption,
      focusedOptionRef,
      onItemFocus,
      onItemSelect,
      selectedOptions,
    } = this.props;
    const renderOption = this.props.renderOption || this._defaultRenderOption;

    const isFocused = option === focusedOption;
    const isSelected = selectedOptions.indexOf(option) > -1;

    return (
      <OptionContainer
        innerRef={ref => focusedOptionRef(ref, isFocused)}
        isDisabled={option.disabled}
        isFocused={isFocused}
        isSelected={isSelected}
        onFocus={onItemFocus}
        onSelect={onItemSelect}
        option={option}
      >
        {renderOption({ option, index, isSelected })}
      </OptionContainer>
    );
  };
}

export default Menu;

const Label = styled(Text)`
  flex: 1;
  ${({ isDisabled }) => isDisabled && `
    color: #ccc;
  `}
`;

const Row = styled(View)`
  align-items: center;
  flex-direction: row;
  height: ${ROW_HEIGHT}px;
  padding: 0 5px;
`;

const SelectedIcon = styled(Text)`
  opacity: ${props => (props.show ? '1' : '0')};
`;
