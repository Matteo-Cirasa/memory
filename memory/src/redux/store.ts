//@reduxjs/toolkit: Fornisce strumenti per configurare Redux.
//react-redux: È l'integrazione di Redux con React.

//configureStore: Configura lo store Redux con il reducer fornito.
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';

// Configura lo store con il reducer del contatore
export const store = configureStore({
  reducer: {
    counter: sessionReducer,
  },
});

// Definizione dei tipi per TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;