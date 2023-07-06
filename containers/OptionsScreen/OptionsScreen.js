import React, {useEffect, useRef, useState} from 'react';
import {I18nManager, TouchableOpacity, View} from 'react-native';
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

const topTabsArray = Object.values(topTabs);

const isRtl = I18nManager.getConstants().isRTL;

const correctedTabs = isRtl ? [...topTabsArray].reverse() : topTabsArray;

const keyExtractor = (itemData, index) => itemData + index;

const TopTab = ({name, active, setCurrentTab, tabIndex}) => {
  return (
    <TouchableOpacity
      style={{width: wp('33%'), backgroundColor: active ? 'blue' : 'magenta'}}
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
        length: wp('100%'),
        offset: wp('100%') * index,
        index,
      })}
      ref={topTabsContainerRef}
      disableIntervalMomentum={true}
      snapToInterval={wp('100%')}
      decelerationRate="fast"
      snapToAlignment="start"
      contentContainerStyle={{
        flexDirection: isRtl ? 'row-reverse' : 'row',
      }}
      onMomentumScrollEnd={event => {
        const contentOffset = event.nativeEvent.contentOffset;
        const index = Math.round(contentOffset.x / wp('100%'));
        setCurrentTab(index);
      }}
      initialScrollIndex={0}
      style={{height: '100%', width: wp('100%')}}
      data={correctedTabs}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item: Screen, index}) => {
        return (
          <View style={{height: '100%', width: wp('100%')}}>
            <Screen navigation={navigation} route={route} />
          </View>
        );
      }}
    />
  );
};

const TopTabBar = ({currentTab, setCurrentTab}) => {
  return (
    <View
      style={{
        backgroundColor: 'red',
        height: hp('5.2%'),
        width: wp('100%'),
      }}>
      <FlatList
        getItemLayout={(data, index) => ({
          length: wp('33%'),
          offset: wp('33%') * index,
          index,
        })}
        data={Object.keys(topTabs)}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={!isRtl ? Object.keys(topTabs).length - 1 : 0}
        renderItem={({item, index}) => (
          <TopTab
            name={item}
            setCurrentTab={setCurrentTab}
            active={currentTab === index}
            tabIndex={index}
          />
        )}
      />
    </View>
  );
};

const TopTabNavigator = ({navigation, route}) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <ScreenContainer customStyle={{justifyContent: 'flex-start'}}>
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
