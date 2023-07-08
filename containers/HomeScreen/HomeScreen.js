import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {saveToStorage} from '../../services/utils/storage/setAsyncStorage';
import {determineRtl} from '../../services/localization/appDirection/setAppDirection';
import {useDispatch} from 'react-redux';
import {setIsLoading, setOpenModal} from '../../store/reducers/appSlice';
import {ScreenContainer} from '../../components/Reusable/reusable';
import {ButtonElement, TextElement} from '../../components/Reusable/reusable';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {i18n, t} = useTranslation();
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
    navigation.navigate('user', {screen: 'Settings'});
  const navigateToOptions2 = () =>
    navigation.navigate('user', {
      screen: 'Options',
      params: {tab: 'settings2'},
    });
  const openModal = () => {
    dispatch(setOpenModal(true));
  };
  return (
    <ScreenContainer>
      <TextElement>{t('home.screen')}</TextElement>
      <ButtonElement title="change language" onPress={changeLanguage} />
      <ButtonElement title="set loading for 3 seconds" onPress={setLoading} />
      <ButtonElement title="open Modal" onPress={openModal} />
      <ButtonElement title="navigate to Settings" onPress={navigateToOptions} />
      <ButtonElement title="Checkout Home3 tab" onPress={navigateToOptions2} />
    </ScreenContainer>
  );
};
export default HomeScreen;
