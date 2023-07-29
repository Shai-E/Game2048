import {useState, useEffect, useCallback, useRef} from 'react';

/**
 * UseTimeCount hook.
 * @param {boolean} shouldCount - Whether the timer should be counting.
 * @return {number} - The current count value.
 */

function useTimeCount() {
  const [count, setCount] = useState(0);
  const [shouldCount, setShouldCount] = useState();
  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);
  const restartCount = useRef(null);
  const pauseTimer = useCallback(() => {
    setShouldCount(false);
  }, []);
  const toggleTimer = useCallback(shouldCount => {
    setShouldCount(shouldCount);
  }, []);
  useEffect(() => {
    let interval;

    if (shouldCount) {
      interval = setInterval(incrementCount, 1000);
      restartCount.current = () => {
        setShouldCount(true);

        setCount(0);
      };
    }

    return () => clearInterval(interval); // Clear interval on unmount or if shouldCount changes.
  }, [shouldCount, incrementCount]);

  return [count, restartCount.current, pauseTimer, toggleTimer, shouldCount];
}

export default useTimeCount;
