import {useState, useEffect, useCallback, useRef} from 'react';

/**
 * UseTimeCount hook.
 * @param {boolean} shouldCount - Whether the timer should be counting.
 * @return {number} - The current count value.
 */

function useTimeCount({initTimer}) {
  // console.log(initTimer, 'initTimer');
  const [count, setCount] = useState(initTimer || 0);
  // console.log(count, 'count');
  // why?
  const [shouldCount, setShouldCount] = useState();
  const [didInit, setDidInit] = useState(false);
  const incrementCount = useCallback(() => {
    setCount(prevCount =>
      !didInit && prevCount < initTimer ? initTimer + 1 : prevCount + 1,
    );
  }, [count]);
  const restartCount = useRef(() => {});
  const pauseTimer = useCallback(() => {
    setShouldCount(false);
  }, []);
  const toggleTimer = useCallback(shouldCount => {
    setShouldCount(shouldCount);
  }, []);
  useEffect(() => {
    let interval;
    if (!shouldCount && initTimer && !didInit) {
      setCount(initTimer);
      setDidInit(true);
      initTimer = null;
    }

    if (shouldCount) {
      interval = setInterval(incrementCount, 1000);
      restartCount.current = init => {
        setShouldCount(true);

        setCount(init || 0);
      };
    }

    return () => clearInterval(interval); // Clear interval on unmount or if shouldCount changes.
  }, [shouldCount, incrementCount, initTimer, count]);

  return [count, restartCount.current, pauseTimer, toggleTimer, shouldCount];
}

export default useTimeCount;
