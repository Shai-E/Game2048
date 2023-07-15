import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import SettingsScreen from '../containers/SettingScreen/SettingsScreen';
// import {createNavigationScreen} from '../services/utils/navigationHelpers/createNavigationScreen';
import {MyCustomTopTabBar} from './TopTabNavigation';
import AppTabBar from '../components/AppTabBar/AppTabBar';
import GameBoard2048 from '../games/Game2048';

const Tab = createBottomTabNavigator();

const bottomTabs = {
  Home: HomeScreen,
  Settings: SettingsScreen,
  Options: MyCustomTopTabBar,
  Search: GameBoard2048,
  // Test: MyCustomTopTabBar2,
};

export const BottomTabs = () => {
  // const tabsToDisplay = createNavigationScreen(bottomTabs, Tab.Screen);
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={() => <AppTabBar />}>
      <Tab.Screen name={'Home'} component={HomeScreen} />
      <Tab.Screen name={'Settings'} component={SettingsScreen} />
      <Tab.Screen name={'Options'} component={MyCustomTopTabBar} />
      <Tab.Screen name={'Search'} component={GameBoard2048} />
    </Tab.Navigator>
  );
};
