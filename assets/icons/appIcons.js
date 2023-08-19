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

export const PauseIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill="currentColor"
      d="M2 6c0-1.886 0-2.828.586-3.414C3.172 2 4.114 2 6 2c1.886 0 2.828 0 3.414.586C10 3.172 10 4.114 10 6v12c0 1.886 0 2.828-.586 3.414C8.828 22 7.886 22 6 22c-1.886 0-2.828 0-3.414-.586C2 20.828 2 19.886 2 18V6ZM14 6c0-1.886 0-2.828.586-3.414C15.172 2 16.114 2 18 2c1.886 0 2.828 0 3.414.586C22 3.172 22 4.114 22 6v12c0 1.886 0 2.828-.586 3.414C20.828 22 19.886 22 18 22c-1.886 0-2.828 0-3.414-.586C14 20.828 14 19.886 14 18V6Z"
    />
  </Svg>
);

export const PlayIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill="currentColor"
      d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.736 4 21.276 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968Z"
    />
  </Svg>
);
