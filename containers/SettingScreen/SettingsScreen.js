import {useTranslation} from 'react-i18next';
import {ScreenContainer} from '../../components/Reusable/Containers';
import {TextElement} from '../../components/Reusable/TextElement';
import {initPalette} from '../../services/initApp/initApp';

const SettingsScreen = ({}) => {
  const {t} = useTranslation();

  return (
    <ScreenContainer>
      <TextElement>{t('screens.settings')}</TextElement>
    </ScreenContainer>
  );
};

export default SettingsScreen;
