import TopTabNavigator from '../components/Reusable/TopTabNavigator';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import SettingsScreen from '../containers/SettingScreen/SettingsScreen';

const topTabs = {
  home1: HomeScreen,
  settings4: SettingsScreen,
};

export const MyCustomTopTabBar = props => TopTabNavigator({topTabs, ...props});
