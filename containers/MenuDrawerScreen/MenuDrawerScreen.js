import {ScreenContainer} from '../../components/Reusable/Containers';
import {TextElement} from '../../components/Reusable/TextElement';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setBottomBG, setTopBG} from '../../store/reducers/appSlice';
import {useColors} from '../../services/customHook/useColors';

export const MenuDrawerScreen = () => {
  const status = useDrawerStatus();
  const dispatch = useDispatch();
  const {background} = useColors();
  const topBackgroundColor = useSelector(
    state => state.appSlice.topBackgroundColor,
  );
  const bottomBackgroundColor = useSelector(
    state => state.appSlice.bottomBackgroundColor,
  );
  const prevColors = useRef({});
  useEffect(() => {
    if (status === 'open') {
      prevColors.current.bottomBackgroundColor = bottomBackgroundColor;
      prevColors.current.topBackgroundColor = topBackgroundColor;
      dispatch(setBottomBG(background));
      dispatch(setTopBG(background));
    }
    return () => {
      dispatch(setTopBG(prevColors.current.topBackgroundColor));
      dispatch(setBottomBG(prevColors.current.bottomBackgroundColor));
    };
  }, [status, prevColors.current]);
  return (
    <ScreenContainer>
      <TextElement>drawer</TextElement>
    </ScreenContainer>
  );
};
