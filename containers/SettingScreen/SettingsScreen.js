import {useTranslation} from 'react-i18next';
import {ScreenContainer, TextElement} from '../../components/Reusable/reusable';

const SettingsScreen = ({}) => {
  const {t} = useTranslation();
  return (
    <ScreenContainer>
      <TextElement>{t('screens.settings')}</TextElement>
    </ScreenContainer>
  );
};

export default SettingsScreen;
