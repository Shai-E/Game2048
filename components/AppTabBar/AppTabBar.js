import React, {useState, useCallback, Fragment} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View} from 'react-native';
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
import {tabs} from '../../fixtures/navigationTabs.json';
import i18n from 'i18next';

const AppTabBar = () => {
  const language = i18n.language;
  const isDarkMode = useSelector(state => state.appSlice.isDarkMode);
  const [rerender, setRerender] = useState(false);

  const [white, light] = [
    EStyleSheet.value('$fillPrimary'),
    EStyleSheet.value('$fillSecondary'),
  ];

  useFocusEffect(
    useCallback(() => {
      setRerender(!rerender);
    }, [language]),
  );

  return (
    <Fragment>
      {(rerender || language) && (
        <View
          style={[
            styles.tabBarContainer,
            {
              backgroundColor: isDarkMode ? white : light,
              borderColor: '#dcdcdc',
              flexDirection: 'row',
              // alignItems: 'center',
            },
          ]}>
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
    height: hp('8%'),
    width: wp('100%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
});

export default AppTabBar;
