import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import SettingsScreen from '../containers/SettingScreen/SettingsScreen';
import {createNavigationScreen} from '../services/utils/navigationHelpers/createNavigationScreen';
import {MyCustomTopTabBar} from './TopTabNavigation';

const Tab = createBottomTabNavigator();

const bottomTabs = {
  Home: HomeScreen,
  Settings: SettingsScreen,
  Options: MyCustomTopTabBar,
};

export const BottomTabs = () => {
  const tabsToDisplay = createNavigationScreen(bottomTabs, Tab.Screen);
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      {tabsToDisplay}
    </Tab.Navigator>
  );
};
