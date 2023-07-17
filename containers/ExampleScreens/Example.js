import {ScreenContainer} from '../../components/Reusable/Containers';
import {initPalette} from '../../services/initApp/initApp';
import {TextElement} from '../../components/Reusable/TextElement';

const GenericExampleScreen = ({title}) => {
  initPalette();
  // console.log('title', title);
  return (
    <ScreenContainer>
      <TextElement>{title}</TextElement>
    </ScreenContainer>
  );
};

export default GenericExampleScreen;
