import React, {useEffect, useRef} from 'react';
import {View, Keyboard, SafeAreaView, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Style
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {setOpenModal} from '../../store/reducers/appSlice';
import {initPalette} from '../../services/initApp/initApp';
import {
  useColors,
  useCurrentPalette,
} from '../../services/customHook/useColors';
import {OverlayLoader} from './OverlayLoader';

export const AppContainer = ({
  behavior,
  keyboardVerticalOffset,
  style,
  children,
}) => {
  initPalette();
  const {background, fillPrimary, fillSecondary} = useColors();
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const topBackgroundColor = useSelector(
    state => state.appSlice.topBackgroundColor,
  );
  const bottomBackgroundColor = useSelector(
    state => state.appSlice.bottomBackgroundColor,
  );
  const modalizeRef = useRef(null);
  const shouldOpenModal = useSelector(state => state.appSlice.openModal);
  const isDarkMode = useSelector(state => state.appSlice.isDarkMode);
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
        backgroundColor={topBackgroundColor || background}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={topBackgroundColor || background}
        />
        {children}
      </SafeAreaView>
      <OverlayLoader isLoading={isLoading} />
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
          bottomBackgroundColor || (isDarkMode ? fillPrimary : fillSecondary)
        }>
        <OverlayLoader isLoading={isLoading} />
      </SafeAreaView>
    </>
  );
};

export const ScreenContainer = ({children, customStyle}) => {
  useCurrentPalette();
  const {background} = useColors();
  return (
    <View
      style={[styles.screen, {backgroundColor: background}, customStyle, ,]}>
      {children}
    </View>
  );
};
const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('2.5%'),
  },
});
