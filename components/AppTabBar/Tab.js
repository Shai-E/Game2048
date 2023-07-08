import React, {useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

// Style
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  SearchIcon as PortfolioIcon,
  SearchIcon as MarketsIcon,
  SearchIcon as FundsIcon,
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
  const [black, brandCyan] = [
    EStyleSheet.value('$success'),
    EStyleSheet.value('$warning'),
  ];
  const {t} = useTranslation();

  const navigationTabs = [
    <MarketsIcon style={{color: screen === route ? brandCyan : black}} />,
    <PortfolioIcon style={{color: screen === route ? brandCyan : black}} />,
    <SearchIcon style={{color: screen === route ? brandCyan : black}} />,
    <FundsIcon style={{color: screen === route ? brandCyan : black}} />,
    <MenuIcon style={{color: screen === route ? brandCyan : black}} />,
  ];

  const routeNavigation = useCallback(() => {
    // if (route === 'user-menu') return navigation.openDrawer();
    if (route === 'user-menu')
      return () => {
        console.log('drawer');
      };
    console.log(section, route);
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
        style={screen === route ? {color: brandCyan} : {color: black}}>
        <TextElement
          customStyle={screen === route ? {color: brandCyan} : {color: black}}
          changeFontByRem={screen === route ? -0.35 : -0.3}>
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
