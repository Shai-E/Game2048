import {ScreenContainer, TextElement} from '../../components/Reusable/reusable';

const GenericExampleScreen = ({title}) => {
  return (
    <ScreenContainer>
      <TextElement>{title}</TextElement>
    </ScreenContainer>
  );
};

export default GenericExampleScreen;
