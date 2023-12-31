import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {saveToStorage} from '../../services/utils/storage/setAsyncStorage';
import {determineRtl} from '../../services/localization/appDirection/setAppDirection';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsDarkMode,
  setIsLoading,
  setOpenModal,
  setTopBG,
} from '../../store/reducers/appSlice';
import {ScreenContainer} from '../../components/Reusable/Containers';
import {LinkElement} from '../../components/Reusable/LinkElement';
import {ButtonElement} from '../../components/Reusable/ButtonElement';
import {TextElement} from '../../components/Reusable/TextElement';
import {Linking, NativeModules, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {initPalette} from '../../services/initApp/initApp';

const {ThemeModule} = NativeModules;

const HomeScreen = () => {
  // initPalette();
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
      params: {tab: 'tab3', section: 'Screen2'},
    });
  const openModal = () => {
    dispatch(setOpenModal(true));
  };
  const handleThemeChange = async () => {
    const nextThemeToUse = isDarkMode ? 'light' : 'dark';
    await dispatch(setIsDarkMode(nextThemeToUse.includes('dark')));
    initPalette();
    dispatch(setTopBG(EStyleSheet.value('$background')));
    await saveToStorage('theme', nextThemeToUse);
    Platform.OS === 'android' && ThemeModule.changeTheme(nextThemeToUse);
  };

  return (
    <ScreenContainer>
      <ButtonElement
        title={t('change.language')}
        onPress={changeLanguage}
        customStyle={{marginVertical: 5}}
      />
      <ButtonElement
        title={t('change.theme') + ': ' + t(isDarkMode ? 'light' : 'dark')}
        onPress={handleThemeChange}
        customStyle={{marginVertical: 5}}
      />
    </ScreenContainer>
  );
};
export default HomeScreen;
