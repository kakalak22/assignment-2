import { takeLeading, select, put, take, call } from "redux-saga/effects";
import * as Actions from "../actionTypesAuth";
import { redirect } from "react-router-dom";
import { notification } from "antd";


export function* watcherAuth() {
    yield takeLeading(Actions.AUTH_CHECK_LOGIN, workerCheckLogin);
    yield takeLeading(Actions.AUTH_LOGOUT, workerLogOut);
}

function* workerCheckLogin(action) {
    const { data = {} } = action;
    const { user } = data;
    if (user.password === "123456" && user.username === "admin") {
        yield put({
            type: Actions.AUTH_SAVE_LOGIN_STATUS,
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
            type: Actions.AUTH_SAVE_LOGIN_STATUS,
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
        description: "Sai Username hoặc Password",
        duration: 2
    })
}

function* workerLogOut(action) {
    try {
        console.log("log out")
        const { isLogin } = yield select(state => state.reducerAuth)
        if (isLogin) {
            yield put({
                type: Actions.AUTH_SAVE_LOGIN_STATUS,
                data: {
                    isAdmin: false,
                    isLogin: false,
                    isUser: false
                }
            })
            action.navigate("/", { replace: true });
        }
    } catch (error) { }
}

