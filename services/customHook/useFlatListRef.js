import {useEffect, useRef, useState} from 'react';

// used on flatlist
export const useFlatListRef = ({offset}) => {
  const [lastOpenedItemIndex, setLastOpenedItemIndex] = useState(0);
  const listRef = useRef(null);
  useEffect(() => {
    lastOpenedItemIndex &&
      listRef?.current?.scrollToIndex({
        index: lastOpenedItemIndex,
        animated: true,
        viewOffset: offset || 0,
      });
    setLastOpenedItemIndex(0);
  }, [lastOpenedItemIndex]);
  return {listRef, lastOpenedItemIndex, setLastOpenedItemIndex};
};
