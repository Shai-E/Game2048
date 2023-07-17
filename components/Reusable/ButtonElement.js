import EStyleSheet from 'react-native-extended-stylesheet';
import {defineAccessibilityId} from '../../services/utils/accessibility/defineAccessibilityProps';
import {TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextElement} from './TextElement';

export const ButtonElement = ({
  title,
  onPress,
  outline,
  buttonColor,
  // TODO: setSpinner,
  customStyle,
  accessibilityLabel,
  changeFontByRem,
}) => {
  const defaultTextColor = buttonColor || '$highlight';
  const presets = EStyleSheet.create({
    $defaultButtonColor: defaultTextColor,
    $defaultTextColor: outline ? defaultTextColor : '$background',
    // background = customStyle?.backgroundColor || outline ? transparent : defaultButtonColor
    // border = customStyle?.borderColor || outline ? defaultBottonColor : 'transparent'
    // text = customStyle?.color || outline ? customStyle?.borderColor || default : 'transparent'

    buttonContainerDefault: {
      width: wp('85%'),
      height: hp('6.4%'),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainerOutline: {
      borderColor: customStyle?.borderColor || '$defaultButtonColor',
      backgroundColor: customStyle?.backgroundColor || 'transparent',
      borderWidth: 2,
    },

    buttonContainerFilled: {
      borderColor:
        customStyle?.borderColor ||
        customStyle?.backgroundColor ||
        'transparent',
      backgroundColor: customStyle?.backgroundColor || '$defaultButtonColor',
      borderWidth: 2,
    },

    textDefault: {
      color: customStyle?.color || '$defaultTextColor' || undefined,
      fontWeight: customStyle?.fontWeight || 'normal',
      textAlign: customStyle?.textAlign || 'auto',
    },
  });
  const accessibilityID = defineAccessibilityId(accessibilityLabel);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View
        style={{
          ...presets.buttonContainerDefault,
          ...customStyle,
          ...(outline
            ? presets.buttonContainerOutline
            : presets.buttonContainerFilled),
        }}
        accessible={true}
        {...accessibilityID}>
        <TextElement
          customStyle={presets.textDefault}
          changeFontByRem={changeFontByRem}>
          {title}
        </TextElement>
      </View>
    </TouchableOpacity>
  );
};
