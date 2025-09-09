// npm install @reduxjs/toolkit react-redux
// npm install --save-dev @types/react-redux

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

// 1. Criar a store, combinando todos os reducers
export const store = configureStore({
    reducer: {
        // Aqui você adicionará os reducers dos seus slices
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// 2. Inferir os tipos `RootState` e `AppDispatch` da própria store
// RootState define o tipo de todo o estado da aplicação
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch define o tipo da função `dispatch`
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
