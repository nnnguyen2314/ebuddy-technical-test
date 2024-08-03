import {
    configureStore,
} from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger';
import reducer  from './reducer';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import asyncActionMessages from "@modules/shared/middlewares/asyncActionMessages";
const logger = createLogger({ collapsed: true });

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["alert"],
};

const persistedReducer = <any>persistReducer<RootState>(persistConfig, reducer);

export function makeStore() {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(logger).concat(asyncActionMessages),
        devTools: true
    });
};

const initStore = makeStore();
export type RootState = ReturnType<typeof initStore.getState>;
export type AppDispatch = typeof initStore.dispatch;
export default initStore;
export const persistedStore = <any>persistStore(initStore);