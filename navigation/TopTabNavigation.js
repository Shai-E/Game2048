import TopTabNavigator from '../components/Reusable/TopTabNavigator';
import GenericExampleScreen from '../containers/ExampleScreens/Example.js';

const topTabs = {
  tab1: GenericExampleScreen.bind(this, {title: '1'}),
  tab2: GenericExampleScreen.bind(this, {title: '2'}),
  tab3: GenericExampleScreen.bind(this, {title: '3'}),
  tab4: GenericExampleScreen.bind(this, {title: '4'}),
  tab5: GenericExampleScreen.bind(this, {title: '5'}),
  tab6: GenericExampleScreen.bind(this, {title: '6'}),
};

export const MyCustomTopTabBar = props => TopTabNavigator({topTabs, ...props});
