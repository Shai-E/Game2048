import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {I18nextProvider} from 'react-i18next';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppContainer} from './components/Reusable/Containers';
import i18n from './services/localization/i18n.config';
import {determineRtl} from './services/localization/appDirection/setAppDirection';
import store from './store/store';
import {Provider} from 'react-redux';

import {initApp} from './services/initApp/initApp';

initApp();

import {BottomTabs} from './navigation/BottomTabNavigation';
import Orientation from 'react-native-orientation';
import WebViewPage from './containers/WebViewScreen/WebViewScreen';
import {navigationRef} from './services/utils/navigationHelpers/rootNavigation';

Orientation.lockToPortrait();

import {createDrawerNavigator} from '@react-navigation/drawer';
import {I18nManager} from 'react-native';
import {MenuDrawerScreen} from './containers/MenuDrawerScreen/MenuDrawerScreen';

const MainNavigator = createNativeStackNavigator();
const UserNavigator = createNativeStackNavigator();

// stack navigation
const UserStack = () => {
  return (
    <UserNavigator.Navigator screenOptions={{headerShown: false}}>
      <UserNavigator.Screen name={'webview'} component={WebViewPage} />
    </UserNavigator.Navigator>
  );
};

const DrawerNavigator = createDrawerNavigator();
const RightDrawer = () => {
  const isRtl = I18nManager.getConstants().isRTL;
  const customScreenOptions = {
    headerShown: false,
    drawerStyle: {width: '100%'},
    drawerPosition: isRtl ? 'right' : 'left',
    unmountOnBlur: true,
    swipeEdgeWidth: 0,
  };

  return (
    <DrawerNavigator.Navigator
      id="RightDrawer"
      drawerContent={props => <MenuDrawerScreen {...props} />}
      screenOptions={customScreenOptions}>
      <DrawerNavigator.Screen name={'tab-bar'} component={BottomTabs} />
    </DrawerNavigator.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'push',
        }}>
        <MainNavigator.Group screenOptions={{headerShown: false}}>
          <MainNavigator.Screen name={'drawer'} component={RightDrawer} />
          <MainNavigator.Screen name={'user'} component={UserStack} />
        </MainNavigator.Group>
      </MainNavigator.Navigator>
    </NavigationContainer>
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
            <AppNavigator />
          </AppContainer>
        </GestureHandlerRootView>
      </I18nextProvider>
    </Provider>
  );
}
