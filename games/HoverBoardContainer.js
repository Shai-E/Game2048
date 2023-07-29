import {Pressable} from 'react-native';

const HoverBoardContainer = ({onPress, children, customStyle}) => {
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
      {children}
    </Pressable>
  );
};

export default HoverBoardContainer;
