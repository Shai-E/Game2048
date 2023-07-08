import React, {useEffect, useRef, useState} from 'react';
import {
  I18nManager,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenContainer, TextElement} from './reusable';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';

const DEFAULT_TAB_WIDTH = wp('33.33%');
const DEFAULT_BAR_HEIGHT = hp('6%');
const DEFAULT_BAR_WIDTH = wp('100%');
// const OFFSET = (DEFAULT_BAR_WIDTH - DEFAULT_TAB_WIDTH) / 2;
const isRtl = I18nManager.getConstants().isRTL;

const TopTab = ({name, active, setCurrentTab, tabIndex}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: DEFAULT_TAB_WIDTH,
        backgroundColor: active
          ? EStyleSheet.value('$fillPrimary')
          : EStyleSheet.value('$fillSecondary'),
      }}
      activeOpacity={0.6}
      onPress={() => {
        setCurrentTab(tabIndex);
      }}>
      <TextElement>{name}</TextElement>
    </TouchableOpacity>
  );
};

const TopTabScreens = ({
  navigation,
  route,
  currentTab,
  setCurrentTab,
  topTabKeysArray,
  topTabs,
}) => {
  const topTabsContainerRef = useRef(null);

  useEffect(() => {
    (currentTab === 0 || currentTab) &&
      topTabsContainerRef.current?.scrollTo({
        x: currentTab * DEFAULT_BAR_WIDTH,
        animated: true,
      });
  }, [currentTab]);

  const handleSnap = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / DEFAULT_BAR_WIDTH);
    if (index === currentTab) return;
    index >= 0 && setCurrentTab(index);
  };

  return (
    <ScrollView
      ref={topTabsContainerRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={wp('100%')}
      snapToAlignment={'start'}
      decelerationRate={'fast'}
      style={{
        height: '100%',
        width: DEFAULT_BAR_WIDTH,
        flexDirection:
          Platform.OS === 'android' && isRtl ? 'row-reverse' : 'row',
      }}
      onScrollEndDrag={handleSnap}
      onMomentumScrollEnd={handleSnap}>
      {topTabKeysArray.map((tabName, index) => {
        const Screen = topTabs[tabName];
        return (
          <View
            key={tabName}
            style={{height: '100%', width: DEFAULT_BAR_WIDTH}}>
            <Screen navigation={navigation} route={route} />
          </View>
        );
      })}
    </ScrollView>
  );
};

const TopTabBar = ({currentTab, setCurrentTab, topTabKeysArray}) => {
  const tabsRef = useRef();

  useEffect(() => {
    tabsRef.current?.scrollTo({
      x: (currentTab - 1) * DEFAULT_TAB_WIDTH,
      animated: true,
    });
  }, [currentTab]);

  return (
    <ScrollView
      ref={tabsRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        height: DEFAULT_BAR_HEIGHT,
        minWidth: DEFAULT_BAR_WIDTH,
        backgroundColor: EStyleSheet.value('$fillSecondary'),
        flexDirection:
          Platform.OS === 'android' && isRtl ? 'row-reverse' : 'row',
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        backgroundColor: EStyleSheet.value('$warning'), // background color on press.
        minWidth:
          DEFAULT_BAR_WIDTH / topTabKeysArray.length > DEFAULT_TAB_WIDTH
            ? undefined
            : '100%',
        marginEnd:
          DEFAULT_BAR_WIDTH / topTabKeysArray.length > DEFAULT_TAB_WIDTH
            ? DEFAULT_BAR_WIDTH - topTabKeysArray.length * DEFAULT_TAB_WIDTH
            : 0,
      }}>
      {topTabKeysArray.map((item, index) => {
        const correctedIndex =
          Platform.OS === 'android' && isRtl
            ? topTabKeysArray.length - 1 - index
            : index;
        return (
          <TopTab
            key={item}
            name={item}
            setCurrentTab={setCurrentTab}
            active={currentTab === correctedIndex}
            tabIndex={correctedIndex}
          />
        );
      })}
    </ScrollView>
  );
};
const TopTabNavigator = ({navigation, route, topTabs}) => {
  const topTabKeysArray = Object.keys(topTabs);
  const correctedDefaultIndex =
    Platform.OS === 'android' && isRtl ? topTabKeysArray.length - 1 : 0;
  const routeNameToIndex = topTabKeysArray.findIndex(
    tabName => tabName === route.params?.tab,
  );

  const routeIndexFound = routeNameToIndex !== -1;
  const initialRouteIndex =
    (routeIndexFound && routeNameToIndex) || correctedDefaultIndex;
  const [currentTab, setCurrentTab] = useState(initialRouteIndex);
  return (
    <ScreenContainer
      customStyle={{justifyContent: 'flex-start', width: DEFAULT_BAR_WIDTH}}>
      <TopTabBar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        topTabKeysArray={topTabKeysArray}
      />
      <TopTabScreens
        navigation={navigation}
        route={route}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        topTabKeysArray={topTabKeysArray}
        topTabs={topTabs}
      />
    </ScreenContainer>
  );
};

export default TopTabNavigator;
