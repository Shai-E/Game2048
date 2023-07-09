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
      params: {tab: 'tab3'},
    });
  const openModal = () => {
    dispatch(setOpenModal(true));
  };
  return (
    <ScreenContainer>
      <TextElement>{t('home.screen')}</TextElement>
      <ButtonElement title={t('change.language')} onPress={changeLanguage} />
      <ButtonElement title={t('set.loading')} onPress={setLoading} />
      <ButtonElement title={t('open.modal')} onPress={openModal} />
      <ButtonElement
        title={t('navigate.to.settings')}
        onPress={navigateToOptions}
      />
      <ButtonElement title={t('checkout.tab')} onPress={navigateToOptions2} />
    </ScreenContainer>
  );
};
export default HomeScreen;
