import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
export const MenuIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 20.035 19"
    {...props}>
    <G fill="none">
      <Path d="M0 0h20v19H0z" data-name="Rectangle 7314" />
      <G
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.2}
        data-name="Group 16241">
        <Path d="M1.377 3.029h18.058" data-name="Line 1456" />
        <Path d="M1.377 9.768h18.058" data-name="Line 1457" />
        <Path d="M1.377 16.507h18.058" data-name="Line 1458" />
      </G>
    </G>
  </Svg>
);

export const SearchIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 16.449 16.449"
    {...props}>
    <G
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.2}
      transform="translate(.6 .6)">
      <Path d="m15 15-3-3" data-name="Line 659" />
      <Circle cx={6} cy={6} r={6} data-name="Ellipse 629" />
    </G>
  </Svg>
);
