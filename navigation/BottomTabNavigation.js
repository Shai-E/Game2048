import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import SettingsScreen from '../containers/SettingScreen/SettingsScreen';
import OptionsScreen from '../containers/OptionsScreen/OptionsScreen';
import {createNavigationScreen} from '../services/utils/navigationHelpers/createNavigationScreen';

const Tab = createBottomTabNavigator();

const bottomTabs = {
  //   TopNavigation: TopTabs,
  Home: HomeScreen,
  Settings: SettingsScreen,
  Options: OptionsScreen,
};

export const BottomTabs = () => {
  const tabsToDisplay = createNavigationScreen(bottomTabs, Tab.Screen);
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      {tabsToDisplay}
    </Tab.Navigator>
  );
};
