import TopTabNavigator from '../components/Reusable/TopTabNavigator';
import GenericExampleScreen from '../containers/ExampleScreens/Example.js';
import GameBoard from '../games/Game2048';

const topTabs = [
  {
    Component: GenericExampleScreen.bind(this, {title: 'Leader Board'}),
    tabName: 'Leader Board',
  },
  {Component: GameBoard.bind(this, {title: '2048'}), tabName: '2048'},
  {
    Component: GenericExampleScreen.bind(this, {title: 'Settings'}),
    tabName: 'Settings',
  },
];

export const Game2048Navigation = props =>
  TopTabNavigator({topTabs, style: 'round', initialTab: 1, ...props});
