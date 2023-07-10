import React, {useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

// Style
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  OptionsIcon,
  HomeIcon,
  SettingsIcon,
  MenuIcon as MenuIcon,
  SearchIcon,
} from '../../assets/icons/tabsIcons';
import {TextElement} from '../Reusable/reusable';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

// Localization
import {useTranslation} from 'react-i18next';

const Tab = ({tab, route, section, icon, accessibilityLabel}) => {
  const navigation = useNavigation();
  const currRoute = useRoute();
  const screen = currRoute.params?.screen || 'rates';
  const [primaryText, warning] = [
    EStyleSheet.value('$primaryText'),
    EStyleSheet.value('$warning'),
  ];
  const {t} = useTranslation();

  const navigationTabs = [
    <HomeIcon style={{color: screen === route ? warning : primaryText}} />,
    <OptionsIcon style={{color: screen === route ? warning : primaryText}} />,
    <SearchIcon style={{color: screen === route ? warning : primaryText}} />,
    <SettingsIcon style={{color: screen === route ? warning : primaryText}} />,
    <MenuIcon style={{color: screen === route ? warning : primaryText}} />,
  ];

  const routeNavigation = useCallback(() => {
    if (route === 'Menu') {
      return navigation.openDrawer();
    }
    navigation.navigate(section, {screen: route});
  }, [screen]);

  return (
    <TouchableOpacity
      style={styles.tabContainer}
      activeOpacity={0.6}
      onPress={routeNavigation}
      accessible={true}
      accessibilityLabel={accessibilityLabel}>
      <View style={styles.iconTabContainer}>{navigationTabs[icon]}</View>
      <TextElement
        style={screen === route ? {color: warning} : {color: primaryText}}>
        <TextElement
          customStyle={
            screen === route ? {color: warning} : {color: primaryText}
          }
          changeFontByRem={-0.3}>
          {t(tab)}
        </TextElement>
      </TextElement>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: wp('20%'),
    height: '100%',
    justifyContent: 'center',
  },
  iconTabContainer: {
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Tab;
