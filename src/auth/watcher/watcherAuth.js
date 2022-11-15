import { takeLeading, select, put, take, call } from "redux-saga/effects";
import * as Actions from "../actionTypesAuth";
import { redirect } from "react-router-dom";


export function* watcherAuth() {
    yield takeLeading(Actions.AUTH_CHECK_LOGIN, workerCheckLogin);
}

function* workerCheckLogin(action) {
    const { data = {} } = action;
    const { user } = data;
    if (user.password === "123456" && user.username === "admin") {
        yield put({
            type: Actions.AUTH_LOGIN,
            data: {
                isAdmin: true,
                isLogin: true
            }
        })
        action.navigate('/admin/san-pham/danh-sach-san-pham');
    }
    if (user.password === "123456" && user.username === "client") {
        yield put({
            type: Actions.AUTH_LOGIN,
            data: {
                isAdmin: false,
                isLogin: true
            }
        })
        action.navigate('/client/danh-sach-san-pham');
    }
    console.log("checkLogin")
}