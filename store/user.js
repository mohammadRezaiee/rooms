import {createSlice} from '@reduxjs/toolkit';
//import axios from 'axios';
import {apiCallBegan} from './api';
import AsyncStorage from '@react-native-community/async-storage';

const slice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isVerificated: false,
    listFavorites: [],
    listLastWatch: [],
    lastWatchCities: [],
    loading: false,
  },
  reducers: {
    userRequested: (user, action) => {
      user.loading = true;
    },

    addUser: (user, action) => {
      user.currentUser = action.payload;
    },

    logIn: (user, action) => {
      user.currentUser = action.payload;
      user.isVerificated = true;
      user.loading = false;
    },

    logOut: (user, action) => {
      user.currentUser = {};
      user.isVerificated = false;
      user.loading = false;
    },

    userRequestFailed: (user, action) => {
      user.loading = false;
    },

    addLastWatcheCities: (user, action) => {
      user.lastWatchCities = user.lastWatchCities.filter(item => {
        return item.cityID !== action.payload.cityID;
      });
      user.lastWatchCities.push(action.payload);
      if (user.lastWatchCities.length > 5) user.lastWatchCities.shift();
      setLastCitiesLocal(user.lastWatchCities);
    },

    addLastWatched: (user, action) => {
      user.listLastWatch = user.listLastWatch.filter(item => {
        return item.room.roomID !== action.payload.room.roomID;
      });
      user.listLastWatch.push(action.payload);
      if (user.listLastWatch.length > 15) user.listLastWatch.shift();
      setLastWatchedLocal(user.listLastWatch);
    },

    loadFavoritesLocal: (user, action) => {
      user.listFavorites = [...action.payload];
    },

    loadLastWatchesLocal: (user, action) => {
      user.listLastWatch = [...action.payload];
    },

    loadLastCitiesLocal: (user, action) => {
      user.lastWatchCities = [...action.payload];
    },

    toggleFavorite: (user, action) => {
      const isFavorite = user.listFavorites.find(item => {
        return item.room.roomID === action.payload.room.roomID;
      });
      if (isFavorite) {
        user.listFavorites = user.listFavorites.filter(item => {
          return item.room.roomID !== action.payload.room.roomID;
        });
      } else {
        user.listFavorites.push(action.payload);
      }
      setFavoritesLocal(user.listFavorites);
    },
  },
});

export const {
  addUser,
  logIn,
  logOut,
  reserved,
  addLastWatched,
  toggleFavorite,
  addLastWatcheCities,
  loadLastCitiesLocal,
  loadLastWatchesLocal,
  loadFavoritesLocal,
} = slice.actions;

export default slice.reducer;

const setLastCitiesLocal = async data => {
  try {
    await AsyncStorage.setItem('@LastCitiesView', JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

const setLastWatchedLocal = async data => {
  try {
    await AsyncStorage.setItem('@LastWatched', JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

const setFavoritesLocal = async data => {
  try {
    await AsyncStorage.setItem('@Favorites', JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const signUpUser = user => {
  apiCallBegan({
    url: url + '/user',
    method: 'post',
    data: user,
    onSuccess: signUp.type,
  });
};

export const logInUser = dispatch => {
  return dispatch(
    apiCallBegan({
      url: url + '/user',
      onStart: userRequested.type,
      onSuccess: logIn.type,
      onError: userRequestFailed.type,
    }),
  );
};
