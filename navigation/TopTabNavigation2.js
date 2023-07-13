import * as React from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP} from 'react-native-responsive-screen';

function Screen1() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Screen 1</Text>
    </View>
  );
}

function Screen2() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Screen 2</Text>
    </View>
  );
}
function Screen3() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Screen 3</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyCustomTopTabBar() {
  return (
    <Tab.Navigator
      initialRouteName={'Screen1'}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: {
          fontSize: 11,
          color: EStyleSheet.value('$fillPrimary'),
        },
        tabBarItemStyle: {width: widthPercentageToDP('33.33%'), padding: 0},
        tabBarIndicatorStyle: {backgroundColor: EStyleSheet.value('$success')},
        tabBarIndicatorContainerStyle: {
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
      {/* <Tab.Screen name="Screen3" component={Screen3} /> */}
    </Tab.Navigator>
  );
}

export default MyCustomTopTabBar;
