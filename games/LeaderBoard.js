import {View} from 'react-native';
import {ScreenContainer} from '../components/Reusable/Containers';
import {TextElement} from '../components/Reusable/TextElement';
import {useEffect, useState} from 'react';
import {getFromStorage} from '../services/utils/storage/setAsyncStorage';

export const LeaderBoard = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    (async () => {
      const games = await getFromStorage('games');
      setGames(games);
    })();
  }, []);
  return (
    <ScreenContainer>
      {games.map(game => {
        console.log(game);
        return (
          <View key={game.date}>
            <TextElement>{game.name}</TextElement>
          </View>
        );
      })}
    </ScreenContainer>
  );
};
