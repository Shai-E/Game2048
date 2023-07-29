import {TouchableOpacity} from 'react-native';

const PressableIcon = ({
  customStyle,
  onPress,
  onLongPress,
  Icon,
  iconColor,
}) => {
  return (
    <TouchableOpacity
      style={customStyle}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon style={{color: iconColor}} />
    </TouchableOpacity>
  );
};

export default PressableIcon;
