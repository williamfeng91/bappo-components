import React from 'react';
import { FlatList, Text, View } from 'bappo-components';
import { styles } from '../helpers';

const data = Array.from({ length: 50 })
  .map((num, index) => ({
    key: index,
  }));

const PropInverted = () => {
  return (
    <View style={{ height: 300 }}>
      <FlatList
        data={data}
        getItemLayout={(_data, index) => ({
          length: 30,
          offset: 30 * index,
          index,
        })}
        inverted
        renderItem={({ item }) => (
          <Text style={styles.row}>{item.key}</Text>
        )}
      />
    </View>
  );
};

export default PropInverted;