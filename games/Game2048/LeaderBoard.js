import {Pressable, ScrollView, View} from 'react-native';
import {ScreenContainer} from '../../components/Reusable/Containers';
import {TextElement} from '../../components/Reusable/TextElement';
import {useCallback, useEffect, useState} from 'react';
import {getFromStorage} from '../../services/utils/storage/setAsyncStorage';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {themes} from './themes';
import {useDispatch} from 'react-redux';
import {setActiveGame} from '../../store/reducers/game2048Slice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

export const LeaderBoard = () => {
  const [games, setGames] = useState([]);
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const games = await getFromStorage('games');
        setGames(games);
      })();
    }, []),
  );
  const colors = themes['classic'];
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleGamePick = activeGame => {
    dispatch(setActiveGame(activeGame));
    navigation.navigate('tab-bar', {
      screen: 'Home',
    });
  };
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{flexDirection: 'column-reverse'}}>
        {games?.slice(games.length - 5).map((game, index) => {
          return (
            <View key={game.date}>
              <TextElement>
                {games.length - 5 === index && 'Current'}
              </TextElement>
              <Pressable
                style={{
                  borderWidth: 1,
                  backgroundColor:
                    games.length - 5 === index ? 'gold' : '#ffffff00',
                }}
                onPress={() => handleGamePick(game)}>
                {game.gameHistory[game.gameHistory.length - 1].board?.map(
                  (row, rowIndex) => {
                    return (
                      <View
                        style={{flexDirection: 'row'}}
                        key={game.gameHistory.length + rowIndex}>
                        {row.map((cell, index) => (
                          <View
                            key={index}
                            style={{
                              width: widthPercentageToDP('20%'),
                              height: widthPercentageToDP('20%'),
                              margin: 5,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: colors[cell.value]?.background,
                            }}>
                            <TextElement
                              customStyle={{color: colors[cell.value]?.text}}>
                              {cell.value > 0 && cell.value}
                            </TextElement>
                          </View>
                        ))}
                      </View>
                    );
                  },
                )}
              </Pressable>
              {/* <Board
              board={game?.board}
              colors={null}
              counter={null}
              focusOnTheme={false}
              displayOnlyBoard={true}
            /> */}
            </View>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};
