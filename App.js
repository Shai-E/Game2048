import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {I18nextProvider} from 'react-i18next';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppContainer} from './components/Reusable/reusable';
import i18n from './services/localization/i18n.config';
import {determineRtl} from './services/localization/appDirection/setAppDirection';
import store from './store/store';
import {Provider} from 'react-redux';

import {initApp} from './services/initApp/initApp';

initApp();

import {BottomTabs} from './navigation/BottomTabNavigation';
import {createNavigationScreen} from './services/utils/navigationHelpers/createNavigationScreen';
import Orientation from 'react-native-orientation';

const MainNavigator = createNativeStackNavigator();

const stacks = {
  user: BottomTabs,
  // auth: BottomTabs
};

const createUserStack = stacks =>
  createNavigationScreen(stacks, MainNavigator.Screen);

Orientation.lockToPortrait();

const AppNavigator = () => {
  const UserStack = createUserStack(stacks);
  useEffect(() => {}, []);
  return (
    <MainNavigator.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true, // Enable animations
        animationTypeForReplace: 'push',
      }}>
      <MainNavigator.Group screenOptions={{headerShown: false}}>
        {UserStack}
      </MainNavigator.Group>
      {/* <MainNavigator.Screen name={'drawer'} component={RightDrawer} /> */}
    </MainNavigator.Navigator>
  );
};

// TODO: install switchElement & finish app initialization including language picker

export default function App() {
  useEffect(() => {
    i18n && determineRtl(i18n);
  }, [i18n]);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <GestureHandlerRootView style={{flex: 1}}>
          <AppContainer>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </AppContainer>
        </GestureHandlerRootView>
      </I18nextProvider>
    </Provider>
  );
}
