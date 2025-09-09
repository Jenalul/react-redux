import { all, takeLatest, call, put, delay } from "redux-saga/effects";
import {
    fetchUsersSuccess,
    fetchUsersFailure,
    type User,
    fetchUsersByIdFailure,
    fetchUsersByIdSuccess,
} from "./userSlice";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
// API USERS https://jsonplaceholder.typicode.com/users/

function* fetchUsers() {
    try {
        yield delay(2000);
        const response: { data: User[] } = yield call(() =>
            axios.get("https://jsonplaceholder.typicode.com/users/")
        );
        yield put(fetchUsersSuccess(response.data));
    } catch (error: unknown) {
        if (error instanceof Error) {
            yield put(fetchUsersFailure(error.message));
        } else {
            yield put(fetchUsersFailure("Erro desconhecido"));
        }
    }
}

function* fetchUsersById(action: PayloadAction<number>) {
    try {
        yield delay(2000);

        const response: { data: User } = yield call(() =>
            axios.get(
                `https://jsonplaceholder.typicode.com/users/${action.payload}`
            )
        );
        yield put(fetchUsersByIdSuccess(response.data));
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchUsersByIdFailure(error.message));
        } else {
            yield put(fetchUsersByIdFailure("Erro desconhecido"));
        }
    }
}

export default function* userSaga() {
    // takeEvery - todo vez que o botão for clicado vai fazer a requisição
    // takeLatest - só pode ser acionado novamente quando terminar a requisição
    yield all([
        takeLatest("user/fetchUsers", fetchUsers),
        takeLatest("user/fetchUsersById", fetchUsersById),
    ]);
}
