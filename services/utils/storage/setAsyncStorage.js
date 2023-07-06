import AsyncStorage from '@react-native-async-storage/async-storage';
import * as asyncStorageKeys from '../../../fixtures/asyncStorageKeys.json';

export const saveToStorage = async (name, payload, identifier) => {
  await AsyncStorage.setItem(
    `${identifier ? identifier + '-' : ''}${name}`,
    JSON.stringify(payload),
  );
};

export const getFromStorage = async (name, identifier) => {
  return JSON.parse(
    await AsyncStorage.getItem(`${identifier ? identifier + '-' : ''}${name}`),
  );
};

export const clearStorage = async keys => {
  const logoutKeys = asyncStorageKeys.session.concat(asyncStorageKeys.default);
  await AsyncStorage.multiRemove(keys || logoutKeys);
};
