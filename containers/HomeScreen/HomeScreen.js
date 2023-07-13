import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {saveToStorage} from '../../services/utils/storage/setAsyncStorage';
import {determineRtl} from '../../services/localization/appDirection/setAppDirection';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsDarkMode,
  setIsLoading,
  setOpenModal,
} from '../../store/reducers/appSlice';
import {LinkElement, ScreenContainer} from '../../components/Reusable/reusable';
import {ButtonElement, TextElement} from '../../components/Reusable/reusable';
import {Linking, NativeModules} from 'react-native';
import {changePalette} from '../../services/initApp/initApp';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {i18n, t} = useTranslation();
  const isDarkMode = useSelector(state => state.appSlice.isDarkMode);
  const changeLanguage = async () => {
    const changeLangTo = i18n.language === 'en' ? 'he' : 'en';
    await saveToStorage('prevLanguage', i18n.language);
    i18n.changeLanguage(changeLangTo);
    await saveToStorage('savedLanguage', changeLangTo);

    determineRtl(i18n);
  };
  const dispatch = useDispatch();
  const setLoading = async () => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 3000);
  };
  const navigateToOptions = () =>
    navigation.navigate('tab-bar', {screen: 'Settings'});
  const navigateToOptions2 = () =>
    navigation.navigate('tab-bar', {
      screen: 'Options',
      params: {tab: 'tab3'},
    });
  const openModal = () => {
    dispatch(setOpenModal(true));
  };
  return (
    <ScreenContainer>
      <TextElement>{t('screens.home')}</TextElement>
      <ButtonElement title={t('change.language')} onPress={changeLanguage} />
      <ButtonElement title={t('set.loading')} onPress={setLoading} />
      <ButtonElement title={t('open.modal')} onPress={openModal} />
      <ButtonElement
        title={t('navigate.to.settings')}
        onPress={navigateToOptions}
      />
      <ButtonElement
        title={t('change.theme')}
        onPress={() => {
          const {ThemeModule} = NativeModules;
          const nextThemeToUse = isDarkMode ? 'light' : 'dark';
          ThemeModule.changeTheme(nextThemeToUse);
          dispatch(setIsDarkMode(!isDarkMode));
          changePalette();
        }}
      />
      <ButtonElement title={t('checkout.tab')} onPress={navigateToOptions2} />
      <TextElement>
        {t('visit.link')}:{' '}
        <LinkElement
          onPress={() => {
            Linking.openURL('https://www.google.co.il');
          }}>
          {t('in.browser')}
        </LinkElement>{' '}
        /{' '}
        <LinkElement
          onPress={() => {
            navigation.navigate('user', {
              screen: 'webview',
              params: {uri: 'https://www.google.co.il'},
            });
          }}>
          {t('inside.app')}
        </LinkElement>
      </TextElement>
    </ScreenContainer>
  );
};
export default HomeScreen;
