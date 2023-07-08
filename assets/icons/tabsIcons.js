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

export const HomeIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    className="svg-icon"
    fill={'currentColor'}
    viewBox="0 0 1024 1024"
    {...props}>
    <Path d="m1009.032 421.165-483.9-404.164a14.999 14.999 0 0 0-19.291 0L21.926 421.165c-4.85 4.066-6.671 10.737-4.503 16.685a15.048 15.048 0 0 0 14.14 9.924h71.289v503.341c0 31.835 25.916 57.736 57.765 57.736H419.57c8.327 0 15.059-6.731 15.059-15.059v-25.705h-.06V693.022c0-44.62 36.291-80.926 80.91-80.926 44.605 0 80.942 36.307 80.942 80.926V984.877l.06.075v8.84c0 8.328 6.731 15.059 15.059 15.059H870.384c31.82 0 57.736-25.901 57.736-57.736v-503.34h71.259a15.079 15.079 0 0 0 14.17-9.925c2.154-5.948.362-12.634-4.517-16.685zm-95.97-3.509c-8.328 0-15.06 6.732-15.06 15.06v518.4c0 15.239-12.378 27.617-27.617 27.617H626.583v-13.086h-.06V693.022c0-61.23-49.83-111.044-111.06-111.044-61.229 0-111.028 49.815-111.028 111.044v285.711H160.632c-15.24 0-27.648-12.378-27.648-27.618v-518.4c0-8.327-6.73-15.059-15.058-15.059h-44.83L515.479 48.173l442.368 369.483h-44.785z" />
  </Svg>
);
