import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage for React Native
  whitelist: ['auth'], // Specify which slices to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export {store, persistor};
