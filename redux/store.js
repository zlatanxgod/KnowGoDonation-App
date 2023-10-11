import {combineReducers} from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';
import User from './reducers/User';
import {logger} from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import Categories from './reducers/Categories';
import Donations from './reducers/Donations';
const rootReducer = combineReducers({
  user: User,
  categories: Categories,
  donations: Donations,
});
const config = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};
const persistedReducer = persistReducer(config, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
export const persistor = persistStore(store);
persistor.purge();
