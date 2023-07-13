import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  openModal: false,
  isDarkMode: true,
  currentRoute: 'Home',
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
    setCurrentRoute: (state, action) => {
      state.currentRoute = action.payload;
    },
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const {setIsLoading, setOpenModal, setCurrentRoute, setIsDarkMode} =
  appSlice.actions;

export default appSlice.reducer;
