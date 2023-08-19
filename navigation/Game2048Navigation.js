import TopTabNavigator from '../components/Reusable/TopTabNavigator';
import GenericExampleScreen from '../containers/ExampleScreens/Example.js';
import GameBoard from '../games/Game2048/Game2048';
import {LeaderBoard} from '../games/Game2048/LeaderBoard';

const topTabs = [
  {
    Component: props => LeaderBoard({title: 'Leader Board', ...props}),
    tabName: 'Leader Board',
  },
  {Component: props => GameBoard({title: '2048', ...props}), tabName: '2048'},
  {
    Component: props => GenericExampleScreen({title: 'Settings', ...props}),
    tabName: 'Settings',
  },
];

export const Game2048Navigation = props =>
  TopTabNavigator({topTabs, style: 'round', initialTab: 1, ...props});
