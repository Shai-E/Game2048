import {useTranslation} from 'react-i18next';

export const useTabs = () => {
  const {t} = useTranslation();
  return [
    {
      tab: t('tabs.home'),
      section: 'tab-bar',
      route: 'Home',
      icon: 0,
      accessibilityLabel: 'appHome',
    },
    {
      tab: t('tabs.settings'),
      section: 'tab-bar',
      route: 'Settings',
      icon: 1,
      accessibilityLabel: 'appSettings',
    },
    // {
    //   tab: t('tabs.options'),
    //   section: 'tab-bar',
    //   route: 'Options',
    //   icon: 3,
    //   accessibilityLabel: 'appOptions',
    // },
    // {
    //   tab: t('tabs.search'),
    //   section: 'tab-bar',
    //   route: 'History',
    //   icon: 2,
    //   accessibilityLabel: 'appSearch',
    // },
    // {
    //   tab: t('tabs.menu'),
    //   section: 'drawer',
    //   route: 'Menu',
    //   icon: 4,
    //   accessibilityLabel: 'appMenu',
    // },
  ];
};
