import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import SettingsScreen from '../containers/SettingScreen/SettingsScreen';
// import {createNavigationScreen} from '../services/utils/navigationHelpers/createNavigationScreen';
import {MyCustomTopTabBar} from './TopTabNavigation';
// import MyCustomTopTabBar2 from './TopTabNavigation2';
import AppTabBar from '../components/AppTabBar/AppTabBar';
import {LeaderBoard} from '../games/Game2048/LeaderBoard';
import GameBoard from '../games/Game2048/Game2048';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={() => <AppTabBar />}>
      <Tab.Screen name={'Home'} component={GameBoard} />
      <Tab.Screen name={'Settings'} component={HomeScreen} />
      {/* <Tab.Screen name={'Options'} component={MyCustomTopTabBar} /> */}
      {/* <Tab.Screen name={'History'} component={LeaderBoard} /> */}
      {/* <Tab.Screen name={'Test'} component={MyCustomTopTabBar2} /> */}
    </Tab.Navigator>
  );
};
