import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  openModal: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
  },
});

export const {setIsLoading, setOpenModal} = appSlice.actions;

export default appSlice.reducer;
