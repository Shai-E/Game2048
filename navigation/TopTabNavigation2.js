import * as React from 'react';
import {I18nManager, Platform, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import {ScreenContainer} from '../components/Reusable/Containers';
import {TextElement} from '../components/Reusable/TextElement';
import {useColors} from '../services/customHook/useColors';

function Screen1() {
  return (
    <ScreenContainer
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextElement>Screen 1</TextElement>
    </ScreenContainer>
  );
}

function Screen2() {
  return (
    <ScreenContainer
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextElement>Screen 2</TextElement>
    </ScreenContainer>
  );
}
function Screen3() {
  return (
    <ScreenContainer
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextElement>Screen 3</TextElement>
    </ScreenContainer>
  );
}
function Screen4() {
  return (
    <ScreenContainer
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextElement>Screen 4</TextElement>
    </ScreenContainer>
  );
}

const {NUMBER_OF_TABS, TAB_WIDTH, BAR_WIDTH} = {
  NUMBER_OF_TABS: 3,
  TAB_WIDTH: widthPercentageToDP('33.33%'),
  BAR_WIDTH: widthPercentageToDP('100%'),
};

const Tab = createMaterialTopTabNavigator();

const isRtl = I18nManager.getConstants().isRTL;

function MyCustomTopTabBar({navigation, route}) {
  const autoNavigateSection = route.params?.section;
  const {fillPrimary, success, fillSecondary, primaryText} = useColors();
  useFocusEffect(
    React.useCallback(() => {
      if (autoNavigateSection) {
        navigation.jumpTo(autoNavigateSection);
      }
    }, [autoNavigateSection]),
  );
  return (
    <Tab.Navigator
      initialRouteName={'Screen1'}
      layoutDirection={'ltr'}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {
          fontSize: 11,
          color: fillPrimary,
        },
        tabBarStyle: {
          backgroundColor: fillPrimary,
        },
        tabBarContentContainerStyle: {
          //   flexDirection:
          //     isRtl && Platform.OS === 'android' ? 'row-reverse' : 'row',
        },
        tabBarItemStyle: {width: TAB_WIDTH, padding: 0},
        tabBarIndicatorStyle: {
          backgroundColor: success,
          //   flexDirection:
          //     isRtl && Platform.OS === 'android' ? 'row-reverse' : 'row',
          //   left: TAB_WIDTH * NUMBER_OF_TABS - BAR_WIDTH,
        },
        tabBarIndicatorContainerStyle: {
          //   flexDirection:
          //     isRtl && Platform.OS === 'android' ? 'row-reverse' : 'row',
          left: TAB_WIDTH * NUMBER_OF_TABS - BAR_WIDTH,
          backgroundColor: fillSecondary,
        },
        tabBarBounces: false,
        lazy: true,
        tabBarAllowFontScaling: false,
        lazyPlaceholder: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: primaryText,
            }}
          />
        ),
      }}>
      <Tab.Screen name="Screen1" component={Screen1} />
      <Tab.Screen name="Screen2" component={Screen2} />
      <Tab.Screen name="Screen3" component={Screen3} />
      <Tab.Screen name="Screen4" component={Screen4} />
    </Tab.Navigator>
  );
}

export default MyCustomTopTabBar;
