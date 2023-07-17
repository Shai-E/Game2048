import {I18nManager, Platform, TouchableOpacity} from 'react-native';
import {useColors} from '../../services/customHook/useColors';
import EStyleSheet from 'react-native-extended-stylesheet';
// import {useRef} from 'react';
import {TextElement} from './TextElement';

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
  const {link} = useColors();
  const styles = EStyleSheet.create({
    link: {
      color: link,
    },
    endIcon: {
      color: link,
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

  // const touchedRef = useRef(false);

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
  const anchor =
    !noHitSlop && Platform.OS === 'android' ? (
      children.split(' ').map((word, index, sentence) => (
        <TouchableOpacity
          key={word + 'link'}
          hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
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
  return <>{anchor}</>;
};
