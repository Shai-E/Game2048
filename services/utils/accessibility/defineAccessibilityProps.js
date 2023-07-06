import {Platform} from 'react-native';

export const defineAccessibilityId = id =>
  Platform.OS === 'android'
    ? {accessibilityLabel: id}
    : {testID: id || Math.random().toString()};
