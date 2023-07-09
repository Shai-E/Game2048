import {useTranslation} from 'react-i18next';

export const useTabs = () => {
  const {t} = useTranslation();
  return [
    {
      tab: t('tabs.home'),
      section: 'user',
      route: 'Home',
      icon: 0,
      accessibilityLabel: 'appHome',
    },
    {
      tab: t('tabs.settings'),
      section: 'user',
      route: 'Settings',
      icon: 1,
      accessibilityLabel: 'appSettings',
    },
    {
      tab: t('tabs.options'),
      section: 'user',
      route: 'Options',
      icon: 3,
      accessibilityLabel: 'appOptions',
    },
    {
      tab: t('tabs.search'),
      section: 'user',
      route: 'Search',
      icon: 2,
      accessibilityLabel: 'appSearch',
    },
    {
      tab: t('tabs.menu'),
      section: 'user',
      route: 'Menu',
      icon: 4,
      accessibilityLabel: 'appMenu',
    },
  ];
};
