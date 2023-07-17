import EStyleSheet from 'react-native-extended-stylesheet';
import {useColors} from '../../services/customHook/useColors';
import {defineFont} from '../../services/utils/fontsSupport/defineFont';
import {defineAccessibilityId} from '../../services/utils/accessibility/defineAccessibilityProps';
import {Text} from 'react-native';

export const TextElement = ({
  customStyle,
  children,
  accessibilityLabel,
  elipsis,
  onPress,
  changeFontByRem,
}) => {
  //   const regular = useColors('regular');
  const {primaryText} = useColors();
  const {isRtl, fontFamily, fontSize} = defineFont(
    customStyle?.fontWeight,
    changeFontByRem,
  );

  const accessibilityID = defineAccessibilityId(accessibilityLabel);

  return (
    <Text
      style={{
        ...styles.default,
        fontSize,
        fontFamily,
        color: primaryText,
        ...customStyle,
      }}
      accessible={true}
      numberOfLines={elipsis || 0}
      ellipsizeMode={elipsis && isRtl ? 'head' : 'tail'}
      onPress={onPress}
      allowFontScaling={false}
      {...accessibilityID}>
      {children}
    </Text>
  );
};

const styles = EStyleSheet.create({
  default: {
    textAlign: 'left',
  },
});
