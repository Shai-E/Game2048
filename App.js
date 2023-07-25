import React, {useEffect} from 'react';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
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
import {
  navigationRef,
  goBack,
} from './services/utils/navigationHelpers/rootNavigation';

Orientation.lockToPortrait();

import {createDrawerNavigator} from '@react-navigation/drawer';
import {I18nManager, NativeModules, TouchableOpacity, View} from 'react-native';
import {MenuDrawerScreen} from './containers/MenuDrawerScreen/MenuDrawerScreen';
import {Game2048Navigation} from './navigation/Game2048Navigation';
import {TextElement} from './components/Reusable/TextElement';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ButtonElement} from './components/Reusable/ButtonElement';
import {BackIcon} from './assets/icons/appIcons';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useColors} from './services/customHook/useColors';

const MainNavigator = createNativeStackNavigator();
const UserNavigator = createNativeStackNavigator();
const {ThemeModule} = NativeModules;

const UserStackHeadear = () => {
  const {background} = useColors();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: widthPercentageToDP('2.5%'),
        paddingVertical: 20,
        backgroundColor: background,
      }}>
      <TextElement>Go Back</TextElement>
      <TouchableOpacity
        onPress={() => {
          goBack();
        }}>
        <BackIcon height={22} width={22} />
      </TouchableOpacity>
    </View>
  );
};

// stack navigation
const UserStack = () => {
  return (
    <UserNavigator.Navigator
      screenOptions={{
        header: () => <UserStackHeadear />,
        headerBackVisible: true,
        headerShown: true,
      }}>
      <UserNavigator.Screen name={'webview'} component={WebViewPage} />
      <UserNavigator.Screen name={'game-2048'} component={Game2048Navigation} />
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

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     ThemeModule.getThemeAsync(theme => {
  //       if (theme.includes('drawer')) {
  //         navigationRef.dispatch(DrawerActions.openDrawer());
  //       }
  //     });
  //   }
  // }, []);

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
