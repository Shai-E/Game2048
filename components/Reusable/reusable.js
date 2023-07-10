import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
  I18nManager,
  Pressable,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Lottie from 'lottie-react-native';

// Style
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {setOpenModal} from '../../store/reducers/appSlice';
import {defineAccessibilityId} from '../../services/utils/accessibility/defineAccessibilityProps';
import {defineFont} from '../../services/utils/fontsSupport/defineFont';

export const TextElement = ({
  customStyle,
  children,
  accessibilityLabel,
  elipsis,
  onPress,
  changeFontByRem,
}) => {
  //   const regular = useColors('regular');
  const {isRtl, fontFamily, fontSize} = defineFont(
    customStyle?.fontWeight,
    changeFontByRem,
  );
  const styles = EStyleSheet.create({
    default: {
      fontSize,
      fontFamily,
      color: '$primaryText',
      textAlign: 'left',
    },
  });

  const accessibilityID = defineAccessibilityId(accessibilityLabel);

  return (
    <Text
      style={{...styles.default, ...customStyle}}
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

export const LinkElement = ({
  customStyle,
  onPress,
  children,
  EndIcon,
  noHitSlop,
  changeFontByRem,
  accessibilityLabel,
}) => {
  const isRtl = I18nManager.getConstants().isRTL;
  const brandRoyal = EStyleSheet.value('$link');
  const styles = EStyleSheet.create({
    link: {
      color: brandRoyal,
    },
    endIcon: {
      color: brandRoyal,
      transform: [{scaleX: isRtl ? -1 : 1}],
    },
  });
  const content = (
    <>
      {children}
      {EndIcon && ' '}
      {EndIcon && <EndIcon style={styles.endIcon} />}
    </>
  );

  const touchedRef = useRef(false);

  // function createTextLinks(text) {
  //   let texts = text.split(' ');
  //   let comps = texts.map(link => {
  //     let linking = link.match(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi);
  //     if (linking)
  //       return (
  //         <TouchableOpacity onPress={() => Linking.openURL(linking)}>
  //           {linking}
  //         </TouchableOpacity>
  //       );
  //     return link;
  //   });
  //   //insert space again
  //   comps = comps.map(comp => [comp, ' ']);
  //   return comps.flat();
  // }
  // console.log(
  //   createTextLinks(
  //     'If you find this interesting, email us at https://www.saachitech.com or contact us at http://stackoverflow.com and we will help you out!',
  //   ),
  // );
  const link = !noHitSlop ? (
    children.split(' ').map((word, index, sentence) => (
      <TouchableOpacity
        key={word + 'link'}
        hitSlop={{top: 40, left: 40, bottom: 40, right: 40}}
        accessibilityLabel={accessibilityLabel || 'default'}
        accessible={true}
        activeOpacity={1}
        onPress={onPress}
        style={{
          overflow: 'hidden',
          transform: [{translateY: ((1 + (changeFontByRem || 0)) * 16) / 5}],
          justifyContent: 'center',
        }}>
        <TextElement
          customStyle={{...styles.link, ...customStyle}}
          changeFontByRem={changeFontByRem || 0}>
          {word}
          {sentence.length - 1 !== index && ' '}
        </TextElement>
      </TouchableOpacity>
    ))
  ) : (
    <TextElement
      accessibilityLabel={accessibilityLabel || 'default'}
      accessible={true}
      onPress={onPress}
      customStyle={{...styles.link, ...customStyle}}
      changeFontByRem={changeFontByRem || 0}>
      {content}
    </TextElement>
  );
  return <>{link}</>;
};

const fullHight = Dimensions.get('window').height;
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
      height: fullHight,
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

export const AppContainer = ({
  behavior,
  keyboardVerticalOffset,
  style,
  topBackgroundColor,
  bottomBackgroundColor,
  children,
}) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const modalizeRef = useRef(null);
  const shouldOpenModal = useSelector(state => state.appSlice.openModal);
  const dispatch = useDispatch();
  useEffect(() => {
    modalizeRef.current[shouldOpenModal ? 'open' : 'close']();
  }, [shouldOpenModal]);
  const openModal = () => modalizeRef.current.open();

  const closeModal = () => modalizeRef.current.close();
  const handleTapOutside = () => {
    closeModal();
  };
  const isLoading = useSelector(state => state.appSlice.isLoading);
  // TODO: add touchableWithoutFeedback to formlayout
  return (
    <>
      {/* <TouchableWithoutFeedback
        accessible={false}
        style={{flex: 1}}
        onPress={dismissKeyboard}> */}
      <SafeAreaView
        style={{flex: 1, ...style}}
        behavior={behavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
        backgroundColor={
          topBackgroundColor || EStyleSheet.value('$background')
        }>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={
            topBackgroundColor || EStyleSheet.value('$background')
          }
        />
        {children}
        <OverlayLoader isLoading={isLoading} />
      </SafeAreaView>
      {/* </TouchableWithoutFeedback> */}
      <Modalize
        modalStyle={{overflow: 'hidden'}}
        ref={modalizeRef}
        onClose={() => dispatch(setOpenModal(false))}
        adjustToContentHeight={true}
        panGestureEnabled={true}>
        <TapGestureHandler onActivated={handleTapOutside}>
          <View style={{backgroundColor: 'red', height: hp('30%')}} />
        </TapGestureHandler>
      </Modalize>
      <SafeAreaView
        backgroundColor={
          bottomBackgroundColor || EStyleSheet.value('$background')
        }></SafeAreaView>
    </>
  );
};

export const ScreenContainer = ({children, customStyle}) => {
  const styles = EStyleSheet.create({
    screen: {
      flex: 1,
      width: wp('100%'),
      backgroundColor: '$background',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: wp('2.5%'),
      ...customStyle,
    },
  });
  return <View style={styles.screen}>{children}</View>;
};
