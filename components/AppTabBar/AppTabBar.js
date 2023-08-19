import React, {useState, useCallback, Fragment} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView, View} from 'react-native';
import {useSelector} from 'react-redux';

// Components
import Tab from './Tab';

// Style
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Fixtures
import {useTabs} from '../../fixtures/navigationTabs';
import {useTranslation} from 'react-i18next';
import {initPalette} from '../../services/initApp/initApp';
import {useColors} from '../../services/customHook/useColors';
import {TextElement} from '../Reusable/TextElement';

const AppTabBar = () => {
  initPalette();
  const {i18n} = useTranslation();
  const language = i18n.language;
  const isDarkMode = useSelector(state => state.appSlice.isDarkMode);
  const bottomBackgroundColor = useSelector(
    state => state.appSlice.bottomBackgroundColor,
  );
  const [rerender, setRerender] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRerender(!rerender);
    }, [language, bottomBackgroundColor]),
  );

  const {fillPrimary, fillSecondary} = useColors();

  const tabs = useTabs();

  return (
    <Fragment>
      {(rerender || language) && (
        <View
          style={[
            styles.tabBarContainer,
            {
              backgroundColor:
                bottomBackgroundColor || isDarkMode
                  ? fillPrimary
                  : fillSecondary,
              borderColor: '#dcdcdc',
              flexDirection: 'row',
              // alignItems: 'center',
            },
          ]}>
          <TextElement
            customStyle={{
              position: 'absolute',
              textAlign: 'center',
              width: '100%',
              fontWeight: 'bold',
            }}>
            2048
          </TextElement>
          {tabs.map(({tab, route, section, icon, accessibilityLabel}) => (
            <Tab
              key={tab}
              tab={tab}
              route={route}
              section={section}
              icon={icon}
              accessibilityLabel={accessibilityLabel}
            />
          ))}
        </View>
      )}
    </Fragment>
  );
};

const styles = EStyleSheet.create({
  tabBarContainer: {
    height: hp('6%'),
    width: wp('100%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
});

export default AppTabBar;
