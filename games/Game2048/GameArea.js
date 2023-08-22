import {TextInput, View} from 'react-native';
import {t} from 'i18next';
import {TextElement} from '../../components/Reusable/TextElement';
import {ButtonElement} from '../../components/Reusable/ButtonElement';
import {useState} from 'react';
import {themes} from './themes';
import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Board from './Board';
import HoverBoardContainer from './HoverBoardContainer';
import {useColors} from '../../services/customHook/useColors';

const displayOnlyBoard = [
  [2, 4, 8, 16],
  [32, 64, 128, 256],
  [512, 1024, 2048, 4096],
  [8192, 16384, 32768, 0],
];

const GameArea = ({
  board,
  counter,
  isPlaying,
  colors,
  isGameOver,
  player,
  setPlayer,
  setTheme,
  theme,
  saveGame,
  prevBoard,
  setBoard,
  historyRef,
  setHistory,
  history,
}) => {
  const [focusOnTheme, setFocusOnTheme] = useState(true);
  const [displayThemes, setDisplayThemes] = useState(false);
  const {fillSecondary} = useColors();
  return (
    <View style={[styles.board, {backgroundColor: fillSecondary}]}>
      {isPlaying ? (
        <>
          <Board
            board={board}
            colors={colors}
            counter={counter}
            focusOnTheme={focusOnTheme}
            displayOnlyBoard={false}
            prevBoard={prevBoard}
            setBoard={setBoard}
            historyRef={historyRef}
            setHistory={setHistory}
            history={history}
          />
          <HoverBoardContainer
            displayContent={isGameOver}
            customStyle={{
              opacity: isGameOver ? 0.5 : 0,
              pointerEvents: isGameOver ? 'auto' : 'box-none',
            }}>
            <TextElement changeFontByRem={1.5}>{t('try.again')}</TextElement>
            <TextInput value={player} onChangeText={setPlayer} />
            <ButtonElement
              title={t('save')}
              outline={true}
              onPress={saveGame}
            />
          </HoverBoardContainer>
        </>
      ) : (
        <>
          <Board
            board={displayOnlyBoard}
            colors={colors}
            counter={counter}
            focusOnTheme={focusOnTheme}
            displayOnlyBoard={true}
            historyRef={historyRef}
            setHistory={setHistory}
            history={history}
          />
          <HoverBoardContainer
            displayContent={!isPlaying}
            onPress={() => setDisplayThemes(prev => !prev)}
            customStyle={{
              flexDirection: 'column',
              backgroundColor: focusOnTheme ? '#ffffff80' : '#fffffff0',
            }}>
            <TextElement changeFontByRem={2} customStyle={{color: '#000000'}}>
              2048
            </TextElement>
            {displayThemes && (
              <>
                <TextElement
                  changeFontByRem={0.2}
                  customStyle={{
                    color: focusOnTheme ? '#00000000' : '#000000',
                    alignSelf: 'flex-start',
                    paddingHorizontal: 10,
                  }}>
                  {t('theme')}
                </TextElement>
                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    // opacity: focusOnTheme ? 0.2 : 1,
                  }}>
                  {Object.entries(themes).map(
                    ([themeName, thisTheme], index) => (
                      <ButtonElement
                        key={themeName}
                        onLongPress={() => {
                          // setFocusOnTheme(prev => !prev);
                          setTheme(themeName);
                        }}
                        customStyle={{
                          width: undefined,
                          height: 40,
                          backgroundColor: focusOnTheme
                            ? themeName === theme
                              ? thisTheme[256].background
                              : thisTheme[256].background + '80'
                            : thisTheme[256].background,
                          color: focusOnTheme
                            ? themeName === theme
                              ? thisTheme[256].text
                              : 'transparent'
                            : thisTheme[256].text,
                          borderWidth: 1,
                          paddingHorizontal: 10,
                          borderColor:
                            themeName === theme
                              ? thisTheme[512].background
                              : thisTheme[256].background,
                        }}
                        title={themeName.toUpperCase()}
                        onPress={() => setTheme(themeName)}
                      />
                    ),
                  )}
                </View>
              </>
            )}
          </HoverBoardContainer>
        </>
      )}
    </View>
  );
};
const styles = EStyleSheet.create({
  board: {
    borderWidth: 5,
    borderColor: '#BBADA0',
    backgroundColor: '$fillSecondary',
    width: widthPercentageToDP('80%') + 50,
    height: widthPercentageToDP('80%') + 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default GameArea;
