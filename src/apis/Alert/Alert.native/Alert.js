// @flow

import RN from 'react-native';
import type { AlertOptions } from '../types.js.flow';
import { validateOptions } from '../helpers';

const defaultAction = {
  text: 'OK',
};

class Alert {
  static async alert(options: AlertOptions) {
    validateOptions(options);

    let actions = options.actions || [defaultAction];

    return new Promise(resolve => {
      actions = actions.map(action => ({
        ...action,
        onPress: () => {
          resolve();
          action.onPress && action.onPress();
        },
      }));
      RN.Alert.alert(options.title, options.message, actions, {
        cancelable: false,
      });
    });
  }
}

export default Alert;