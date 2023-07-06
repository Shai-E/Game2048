import React from 'react';
import {StyleSheet, Dimensions, Animated} from 'react-native';
import Lottie from 'lottie-react-native';
import {TextElement} from './Reusable/reusable';

const fullHight = Dimensions.get('window').height;
const fullWidth = Dimensions.get('window').width;
const lottieDimension = Dimensions.get('window').width * 0.5;

const OverlayLoader = ({fadeAnim, isLoading, customStyle, background}) => {
  return (
    <Animated.View
      style={[
        styles.screen,
        {opacity: fadeAnim, backgroundColor: background || '#0909099f'},
      ]}
      pointerEvents={isLoading ? 'auto' : 'none'}>
      <TextElement customStyle={{color: 'blue', backgroundColor: 'red'}}>
        djfhldsfjhldsjkfhlsdkfhlds fskdjfhksdjfh alsidjhi
      </TextElement>
      <Lottie
        source={require('../assets/animations/loader-3dots.json')}
        style={[styles.lottie, customStyle]}
        autoPlay
        loop
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: fullHight,
    width: fullWidth,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  lottie: {
    position: 'absolute',
    width: lottieDimension,
    height: lottieDimension,
    backgroundColor: 'red',
  },
});

export default OverlayLoader;
