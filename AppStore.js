import { createStore } from 'redux';
import reduxDevTools from 'remote-redux-devtools';
import createSecureStore from 'redux-persist-expo-securestore';
import { persistReducer, persistStore } from 'redux-persist';

import AppReducer from './AppReducer';

const configStore = {
  key: 'root',
  storage: createSecureStore(),
  blacklist: ['scannedOrder', 'scannedLocation', 'user'],
};

const persistedReducer = persistReducer(configStore, AppReducer);

export const store = createStore(persistedReducer, reduxDevTools());
export const persistor = persistStore(store);
