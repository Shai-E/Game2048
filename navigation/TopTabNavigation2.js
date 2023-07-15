import * as React from 'react';
import {I18nManager, Platform, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import {ScreenContainer, TextElement} from '../components/Reusable/reusable';

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
  console.log(route.params, 'hi');
  useFocusEffect(
    React.useCallback(() => {
      if (autoNavigateSection) {
        console.log('work');
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
          color: EStyleSheet.value('$fillPrimary'),
        },
        tabBarStyle: {
          //   transform: [{scaleX: -1}],
          backgroundColor: EStyleSheet.value('$fillPrimary'),
        },
        tabBarContentContainerStyle: {
          flexDirection:
            isRtl && Platform.OS === 'android' ? 'row-reverse' : 'row',
          // maxWidth: widthPercentageToDP('100%'),
          // width: TAB_WIDTH * 2,
          // direction: 'ltr',
          // backgroundColor: 'red',
        },
        tabBarItemStyle: {width: TAB_WIDTH, padding: 0},
        tabBarIndicatorStyle: {
          backgroundColor: EStyleSheet.value('$success'),
          flexDirection:
            isRtl && Platform.OS === 'android' ? 'row-reverse' : 'row', //   left: TAB_WIDTH * NUMBER_OF_TABS - BAR_WIDTH,
        },
        tabBarIndicatorContainerStyle: {
          flexDirection:
            isRtl && Platform.OS === 'android' ? 'row-reverse' : 'row',
          left: TAB_WIDTH * NUMBER_OF_TABS - BAR_WIDTH,
          backgroundColor: EStyleSheet.value('$fillSecondary'),
        },
        tabBarBounces: false,
        lazy: true,
        tabBarAllowFontScaling: false,
        lazyPlaceholder: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: EStyleSheet.value('$primaryText'),
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
