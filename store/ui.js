import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ui',
  initialState: {
    isVisibleTabBar: true,
    isVisibleHeader: true,
    currentScreen: '',
  },
  reducers: {
    setVisible: (ui, action) => {
      ui.isVisibleTabBar = true;
    },
    setUnvisible: (ui, action) => {
      ui.isVisibleTabBar = false;
    },
    hideHeader: (ui, action) => {
      ui.isVisibleHeader = false;
    },
    showHeader: (ui, action) => {
      ui.isVisibleHeader = true;
    },
    setCurrentScreen: (ui, action) => {
      ui.currentScreen = action.payload;
      console.log(ui.currentScreen);
    },
  },
});

export const {
  setVisible,
  setUnvisible,
  hideHeader,
  showHeader,
  setCurrentScreen,
} = slice.actions;

export default slice.reducer;
