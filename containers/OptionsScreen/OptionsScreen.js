import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScreenContainer, TextElement} from '../../components/Reusable/reusable';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';
import HomeScreen from '../HomeScreen/HomeScreen';
import SettingsScreen from '../SettingScreen/SettingsScreen';

const topTabs = {
  home1: HomeScreen,
  settings2: SettingsScreen,
  home3: SettingsScreen,
  home4: SettingsScreen,
  home5: SettingsScreen,
};

const DEFAULT_TAB_WIDTH = wp('33.33%');
const DEFAULT_BAR_WIDTH = wp('100%');
const OFFSET = (DEFAULT_BAR_WIDTH - DEFAULT_TAB_WIDTH) / 2;

const topTabsArray = Object.values(topTabs);

const keyExtractor = (itemData, index) => itemData + index;

const TopTab = ({name, active, setCurrentTab, tabIndex}) => {
  return (
    <TouchableOpacity
      style={{
        width: DEFAULT_TAB_WIDTH,
        backgroundColor: active ? 'blue' : 'magenta',
      }}
      activeOpacity={0.6}
      onPress={() => {
        console.log(name);
        setCurrentTab(tabIndex);
      }}>
      <TextElement>{name}</TextElement>
    </TouchableOpacity>
  );
};

const TopTabScreens = ({navigation, route, currentTab, setCurrentTab}) => {
  const topTabsContainerRef = useRef(null);

  useEffect(() => {
    (currentTab === 0 || currentTab) &&
      topTabsContainerRef.current?.scrollToIndex({
        animated: true,
        index: currentTab,
      });
  }, [currentTab]);

  return (
    <FlatList
      getItemLayout={(data, index) => ({
        length: DEFAULT_BAR_WIDTH,
        offset: DEFAULT_BAR_WIDTH * index,
        index,
      })}
      ref={topTabsContainerRef}
      disableIntervalMomentum={true}
      snapToInterval={DEFAULT_BAR_WIDTH}
      decelerationRate="fast"
      snapToAlignment="start"
      onMomentumScrollBegin={event => {
        const contentOffset = event.nativeEvent.contentOffset;
        const index = Math.floor(contentOffset.x / DEFAULT_BAR_WIDTH);
        index >= 0 && setCurrentTab(index);
      }}
      onMomentumScrollEnd={event => {
        const contentOffset = event.nativeEvent.contentOffset;
        const index = Math.round(contentOffset.x / DEFAULT_BAR_WIDTH);
        index >= 0 && setCurrentTab(index);

        // setCurrentTab(index);
      }}
      bounces={false}
      initialScrollIndex={0}
      style={{height: '100%', width: DEFAULT_BAR_WIDTH}}
      data={topTabsArray}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item: Screen, index}) => {
        return (
          <View style={{height: '100%', width: DEFAULT_BAR_WIDTH}}>
            <Screen navigation={navigation} route={route} />
          </View>
        );
      }}
    />
  );
};

const TopTabBar = ({currentTab, setCurrentTab}) => {
  const tabsRef = useRef();
  useEffect(() => {
    tabsRef.current?.scrollToIndex({
      index: currentTab,
      animated: true,
      viewOffset: OFFSET,
    });
  }, [currentTab]);
  return (
    <FlatList
      ref={tabsRef}
      getItemLayout={(data, index) => ({
        length: DEFAULT_TAB_WIDTH,
        offset: DEFAULT_TAB_WIDTH * index,
        index,
      })}
      style={{
        height: hp('5.2%'),
        width: DEFAULT_BAR_WIDTH,
      }}
      snapToInterval={DEFAULT_TAB_WIDTH}
      data={Object.keys(topTabs)}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={0}
      bounces={false}
      renderItem={({item, index}) => (
        <TopTab
          name={item}
          setCurrentTab={setCurrentTab}
          active={currentTab === index}
          tabIndex={index}
        />
      )}
    />
  );
};

const TopTabNavigator = ({navigation, route}) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <ScreenContainer
      customStyle={{justifyContent: 'flex-start', width: DEFAULT_BAR_WIDTH}}>
      <TopTabBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <TopTabScreens
        navigation={navigation}
        route={route}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </ScreenContainer>
  );
};

export default TopTabNavigator;
