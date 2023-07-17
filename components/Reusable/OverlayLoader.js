import {useEffect, useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Animated} from 'react-native';
import Lottie from 'lottie-react-native';

const fullHeight = Dimensions.get('window').height;
const fullWidth = Dimensions.get('window').width;
const lottieDimension = Dimensions.get('window').width * 0.5;

export const OverlayLoader = ({isLoading, customStyle, background}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setLoaderAnimation(isLoading ? 1 : 0);
  }, [isLoading]);

  const setLoaderAnimation = opacity => {
    Animated.timing(fadeAnim, {
      toValue: opacity,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const styles = StyleSheet.create({
    screen: {
      height: fullHeight,
      width: fullWidth,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
    },
    lottie: {
      position: 'absolute',
      width: lottieDimension,
      height: lottieDimension,
    },
  });
  return (
    <Animated.View
      style={[
        styles.screen,
        {opacity: fadeAnim, backgroundColor: background || '#0909099f'},
      ]}
      pointerEvents={isLoading ? 'auto' : 'none'}>
      <Lottie
        source={require('../../assets/animations/loader-3dots.json')}
        style={[styles.lottie, customStyle]}
        autoPlay
        loop
      />
    </Animated.View>
  );
};
