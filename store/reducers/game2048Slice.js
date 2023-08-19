import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  activeGame: null,
};

export const game2048Slice = createSlice({
  name: 'game2048',
  initialState,
  reducers: {
    setActiveGame: (state, action) => {
      state.activeGame = action.payload;
    },
  },
});

export const {setActiveGame} = game2048Slice.actions;

export default game2048Slice.reducer;
