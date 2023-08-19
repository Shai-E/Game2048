import {Pressable} from 'react-native';

const HoverBoardContainer = ({
  onPress,
  children,
  customStyle,
  displayContent,
}) => {
  return (
    <Pressable
      style={{
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        backgroundColor: 'blue',
        ...customStyle,
      }}
      onPress={onPress}>
      {displayContent && children}
    </Pressable>
  );
};

export default HoverBoardContainer;
