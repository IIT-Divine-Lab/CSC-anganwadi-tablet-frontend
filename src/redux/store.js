import { configureStore } from "@reduxjs/toolkit";
import AllReducer from "./reducers/index";
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
   key: 'root',
   storage,
};

const reducer = persistReducer(persistConfig, AllReducer);

const store = configureStore({
   reducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});

const persistor = persistStore(store);

export { store, persistor }