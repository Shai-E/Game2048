import TopTabNavigator from '../components/Reusable/TopTabNavigator';
import GenericExampleScreen from '../containers/ExampleScreens/Example.js';

// const topTabs = {
//   tab1: GenericExampleScreen.bind(this, {title: '1'}),
//   tab2: GenericExampleScreen.bind(this, {title: '2'}),
//   tab3: GenericExampleScreen.bind(this, {title: '3'}),
//   tab4: GenericExampleScreen.bind(this, {title: '4'}),
//   tab5: GenericExampleScreen.bind(this, {title: '5'}),
//   tab6: GenericExampleScreen.bind(this, {title: '6'}),
// };

const topTabs = [
  {
    Component: GenericExampleScreen.bind(this, {title: '1'}),
    tabName: 'tab1',
  },
  {
    Component: GenericExampleScreen.bind(this, {title: '2'}),
    tabName: 'tab2',
  },
  {
    Component: GenericExampleScreen.bind(this, {title: '3'}),
    tabName: 'tab3',
  },
  {
    Component: GenericExampleScreen.bind(this, {title: '4'}),
    tabName: 'tab4',
  },
  {
    Component: GenericExampleScreen.bind(this, {title: '5'}),
    tabName: 'tab5',
  },
  {
    Component: GenericExampleScreen.bind(this, {title: '6'}),
    tabName: 'tab6',
  },
];

export const MyCustomTopTabBar = props =>
  TopTabNavigator({topTabs, style: 'basic', ...props});
