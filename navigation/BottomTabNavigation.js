import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import SettingsScreen from '../containers/SettingScreen/SettingsScreen';
// import {createNavigationScreen} from '../services/utils/navigationHelpers/createNavigationScreen';
import {MyCustomTopTabBar} from './TopTabNavigation';
// import MyCustomTopTabBar2 from './TopTabNavigation2';
import AppTabBar from '../components/AppTabBar/AppTabBar';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={() => <AppTabBar />}>
      <Tab.Screen name={'Home'} component={HomeScreen} />
      <Tab.Screen name={'Settings'} component={SettingsScreen} />
      <Tab.Screen name={'Options'} component={MyCustomTopTabBar} />
      <Tab.Screen name={'Search'} component={SettingsScreen} />
      {/* <Tab.Screen name={'Test'} component={MyCustomTopTabBar2} /> */}
    </Tab.Navigator>
  );
};
