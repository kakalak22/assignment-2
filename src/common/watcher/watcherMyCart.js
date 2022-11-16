import { takeLatest, select, put, } from "redux-saga/effects";

import * as Actions from "../actionTypesSearch";

export function* watcherMyCart() {
    yield takeLatest(Actions.ADD_TO_CART, workerAddToCart);
}

function* workerAddToCart(action) {
    try {
        const { data = {} } = action;
        const { sanPham } = data;
        console.log(sanPham)
        const { danhSachSanPham } = yield select(state => state.reducerMyCart.myCart);
        let copyDanhSachSanPham = [...danhSachSanPham];

        let index = danhSachSanPham.findIndex((element) => {
            return element.id === sanPham.id;
        });

        if (index > -1) {
            copyDanhSachSanPham[index].soLuongSanPham += sanPham.soLuongSanPham;
        }
        if (index < 0) {
            copyDanhSachSanPham.unshift(sanPham);
        }

        const newMyCart = {
            danhSachSanPham: copyDanhSachSanPham,
        }

        console.log(newMyCart)

        yield put({
            type: Actions.SAVE_ITEM_TO_CART,
            data: {
                newMyCart: newMyCart
            }
        })
    } catch (error) { }


}
