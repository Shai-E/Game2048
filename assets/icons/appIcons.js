import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {useColors} from '../../services/customHook/useColors';
import {I18nManager} from 'react-native';
const isRtl = I18nManager.getConstants().isRTL;
export const BackIcon = props => {
  const {primaryText} = useColors();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      style={[props?.style, {transform: [{scaleX: isRtl ? 1 : -1}]}]}>
      <G data-name="Layer 2" fill={primaryText}>
        <Path
          d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
          data-name="arrow-ios-back"
        />
      </G>
    </Svg>
  );
};

export const SaveIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 20v-5H9v5m9 0H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 9.828V18a2 2 0 0 1-2 2Z"
    />
  </Svg>
);
