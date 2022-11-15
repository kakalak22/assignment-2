import { takeLeading, select, put, take, call } from "redux-saga/effects";
import * as Actions from "../actionTypesAuth";
import { redirect } from "react-router-dom";
import { notification } from "antd";


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
                isLogin: true,
                isUser: false
            }
        })
        action.navigate('/admin/san-pham/danh-sach-san-pham');
        return;
    }
    if (user.password === "123456" && user.username === "client") {
        yield put({
            type: Actions.AUTH_LOGIN,
            data: {
                isAdmin: false,
                isLogin: true,
                isUser: true
            }
        })
        action.navigate('/client/danh-sach-san-pham');
        return;
    }
    notification.error({
        message: "Đăng nhập thất bại",
        description: "Sai Username hoặc Password"
    })
}