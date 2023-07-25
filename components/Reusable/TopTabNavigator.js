import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  I18nManager,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenContainer} from './Containers';
import {TextElement} from './TextElement';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setTopBG} from '../../store/reducers/appSlice';
import {initPalette} from '../../services/initApp/initApp';
import {useColors} from '../../services/customHook/useColors';

const DEFAULT_TAB_WIDTH = wp('33.33%');
const DEFAULT_BAR_HEIGHT = hp('6%');
const DEFAULT_BAR_WIDTH = wp('100%');
const isRtl = I18nManager.getConstants().isRTL;
const DEFAULT_STYLE = 'basic'; // basic || round

const TopTab = ({name, active, setCurrentTab, tabIndex, tabBarStyle}) => {
  const {fillPrimary, fillSecondary, background} = useColors();
  const defaultThemes = {
    round: {
      touchableStyle: {
        backgroundColor: background,
      },
      innerViewStyle: {
        marginHorizontal: wp('1%'),
        width: DEFAULT_TAB_WIDTH - wp('2%'),
        backgroundColor: active ? fillPrimary : fillSecondary,
        borderColor: 'white',
        paddingVertical: 4,
        borderWidth: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    basic: {
      touchableStyle: {
        backgroundColor: active ? fillPrimary : fillSecondary,
      },
      innerViewStyle: {},
    },
  };
  initPalette();
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: DEFAULT_TAB_WIDTH,
        ...defaultThemes[tabBarStyle].touchableStyle,
      }}
      activeOpacity={0.6}
      onPress={() => {
        setCurrentTab(tabIndex);
      }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            ...defaultThemes[tabBarStyle].innerViewStyle,
          }}>
          <TextElement>{name}</TextElement>
        </View>
      </View>
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

  const handleScreenTopTabFocus = () => {
    (currentTab === 0 || currentTab) &&
      topTabsContainerRef.current?.scrollTo({
        x: currentTab * DEFAULT_BAR_WIDTH,
        animated: true,
      });
  };

  useEffect(handleScreenTopTabFocus, [currentTab]);

  const handleSnap = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / DEFAULT_BAR_WIDTH);
    if (index === currentTab) return;
    index >= 0 && setCurrentTab(index);
  };
  const canmomentum = useRef(false);

  return useMemo(
    () => (
      <ScrollView
        ref={topTabsContainerRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={wp('100%')}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        onLayout={handleScreenTopTabFocus}
        style={{
          height: '100%',
          width: DEFAULT_BAR_WIDTH,
        }}
        contentContainerStyle={
          {
            // flexDirection:
            //   Platform.OS === 'android' && isRtl ? 'row-reverse' : 'row',
          }
        }
        onMomentumScrollBegin={() => {
          canmomentum.current = true;
        }}
        onScrollEndDrag={handleSnap}
        onMomentumScrollEnd={event => {
          if (canmomentum.current) handleSnap(event);
          canmomentum.current = false;
        }}>
        {topTabKeysArray.map((tabName, index) => {
          const Screen = topTabs[index].Component;
          return (
            <View
              key={tabName}
              style={{height: '100%', width: DEFAULT_BAR_WIDTH}}>
              <Screen navigation={navigation} route={route} />
            </View>
          );
        })}
      </ScrollView>
    ),
    [currentTab],
  );
};

const TopTabBar = ({
  currentTab,
  setCurrentTab,
  topTabKeysArray,
  initRoute,
  tabBarStyle,
}) => {
  const {fillSecondary, warning, background} = useColors();

  const tabsRef = useRef();
  const OFFSET =
    Math.floor(DEFAULT_BAR_WIDTH - DEFAULT_TAB_WIDTH) / 2 / DEFAULT_TAB_WIDTH;

  const handleTopTabFocus = () => {
    tabsRef.current?.scrollTo({
      x: (currentTab - OFFSET) * DEFAULT_TAB_WIDTH,
      animated: true,
    });
  };

  useEffect(() => {
    if (tabsRef.current && initRoute) {
      const index = topTabKeysArray.indexOf(initRoute);
      const correctedIndex =
        isRtl && Platform.OS === 'android'
          ? topTabKeysArray.length - 1 - index
          : index;
      setCurrentTab(correctedIndex);
    }
  }, [initRoute, tabsRef.current]);

  useEffect(handleTopTabFocus, [currentTab]);

  return (
    <ScrollView
      ref={tabsRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onLayout={handleTopTabFocus}
      style={{
        height: DEFAULT_BAR_HEIGHT,
        minWidth: DEFAULT_BAR_WIDTH,
        backgroundColor: tabBarStyle === 'round' ? background : fillSecondary,
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        backgroundColor: tabBarStyle === 'round' ? background : warning, // background color on press.
        // flexDirection:
        //   Platform.OS === 'android' && isRtl ? 'row-reverse' : 'row',
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
            tabBarStyle={tabBarStyle}
          />
        );
      })}
    </ScrollView>
  );
};
const TopTabNavigator = ({navigation, route, topTabs, style, initialTab}) => {
  const topTabKeysArray = topTabs.reduce((acc, item) => {
    return [...acc, item.tabName];
  }, []);
  const correctedDefaultIndex =
    Platform.OS === 'android' && isRtl
      ? topTabKeysArray.length - 1 - initialTab || topTabKeysArray.length - 1
      : initialTab || 0;
  const routeNameToIndex = topTabKeysArray.findIndex(tabName => {
    return tabName === route.params?.tab;
  });
  const routeIndexFound = routeNameToIndex !== -1;
  const initialRouteIndex =
    (routeIndexFound && routeNameToIndex) || correctedDefaultIndex;
  const [currentTab, setCurrentTab] = useState(
    Platform.OS === 'android' && isRtl && route.params?.tab
      ? topTabKeysArray.length - 1 - initialRouteIndex
      : initialRouteIndex,
  );

  const tabBarStyle = style || DEFAULT_STYLE;

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      tabBarStyle === 'basic' &&
        dispatch(setTopBG(EStyleSheet.value('$fillSecondary')));
      return () => {
        dispatch(setTopBG(EStyleSheet.value('$background')));
      };
    }, []),
  );

  return (
    <ScreenContainer
      customStyle={{justifyContent: 'flex-start', width: DEFAULT_BAR_WIDTH}}>
      <TopTabBar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        topTabKeysArray={topTabKeysArray}
        initRoute={route.params?.tab}
        tabBarStyle={tabBarStyle}
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
