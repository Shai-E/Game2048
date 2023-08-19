import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

// Reducers:
import appSlice from './reducers/appSlice';
import tabsSlice from './reducers/tabsSlice';
import game2048Slice from './reducers/game2048Slice';

// Flipper - Debuuger
const rootReducer = combineReducers({
  appSlice,
  tabsSlice,
  game2048Slice,
});
const middlewares = [
  /* other middlewares */
];
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middlewares),
});

export default store;
