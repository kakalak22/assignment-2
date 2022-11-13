import { takeLeading, select, put, take, call } from "redux-saga/effects";
import * as Actions from "../actionTypesSearch";
import * as lodash from "lodash";
import { notification } from "antd";

export function* watcherSearch() {
    yield takeLeading(Actions.SEARCH_PROCESS, watcherSearchProcess);
}

function* watcherSearchProcess(action) {
    try {
        const { data = {} } = action;
        const { searchValue, ttype } = data;
        const { danhSachSanPham } = yield select(state => state.reducerSanPham);
        console.log(ttype);
        let newDanhSachSanPham = [];
        switch (ttype) {
            case "ten": {
                newDanhSachSanPham = danhSachSanPham.filter(sanPham => (lodash.includes(sanPham.ten.toLowerCase(), searchValue.toLowerCase())));
                break;
            }

            case "soLuongLonHon": {
                newDanhSachSanPham = danhSachSanPham.filter(sanPham => sanPham.soLuongSanPham >= parseInt(searchValue))
                break;
            }

            case "soLuongNhoHon": {
                newDanhSachSanPham = danhSachSanPham.filter(sanPham => sanPham.soLuongSanPham <= parseInt(searchValue))
                break;
            }

            default: {
                newDanhSachSanPham = danhSachSanPham.filter(sanPham => (lodash.includes(sanPham.ten.toLowerCase(), searchValue.toLowerCase())));
                break;
            }
        };

        if (!newDanhSachSanPham.length > 0) {
            notification.warning({
                message: "Lỗi",
                description: "Không tìm thấy sản phẩm theo thông tin đã nhập",
                placement: "bottomRight"
            })
        } else {
            notification.success({
                message: "Thành công",
                description: `Tìm thấy ${newDanhSachSanPham.length} sản phẩm theo yêu cầu`,
                placement: "bottomRight"
            })
        }

        yield put({
            type: Actions.SEARCH_SAVE_RESULT,
            data: {
                newDanhSachSanPham: newDanhSachSanPham
            }
        });

    } catch (error) { }

}