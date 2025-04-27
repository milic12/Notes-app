import { configureStore, Reducer } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { noteSlice } from "./features/noteSlice";
import { notesApi } from "./services/notesApi";

const persistConfig = {
  key: "note",
  storage,
};

const persistedReducer = persistReducer(persistConfig, noteSlice.reducer);

export const store = configureStore({
  reducer: {
    note: persistedReducer as Reducer,
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(notesApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
