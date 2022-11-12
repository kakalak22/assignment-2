import { notification } from "antd";
import { takeLeading, select, put, take, call } from "redux-saga/effects";
import { v4 as uuidv4 } from 'uuid';
import * as Actions from "../actionsTypeSanpham";
import axios from "axios";

export function* watcherSanPham() {
    yield takeLeading(Actions.SAN_PHAM_CREATE_NEW, workerCreateNewSanPham);
    yield takeLeading(Actions.SAN_PHAM_CHECK_SAVED, workerCheckSavedSanPham);
    yield takeLeading(Actions.SAN_PHAM_MAPPING, workerMappingSanPham);
    yield takeLeading(Actions.CALL_API, workerCallApi);
    yield takeLeading(Actions.SAN_PHAM_UPDATE, workerUpdateSanPham);

}

function* workerCreateNewSanPham(action) {
    try {
        const newId = uuidv4();
        const { danhSachSanPham } = yield select(state => state.reducerSanPham)
        const { data = {} } = action;
        console.log(data)

        const { sanPham, imgUrl } = data;
        let newDanhSachSanPham = [{
            id: newId, ...sanPham, linkHinhAnh: imgUrl
        }, ...danhSachSanPham];
        yield put({
            type: Actions.SAN_PHAM_SAVE, data:
            {
                newDanhSachSanPham: newDanhSachSanPham
            }
        });
        yield put({
            type: Actions.SAN_PHAM_CHECK_SAVED,
            data: {
                prevDanhSachSanPham: danhSachSanPham
            }
        })

        const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
        const { isSaved } = res.data;
        console.log(isSaved)
        if (isSaved) notification.success({
            message: "San pham created",
            description: "Successful",
            placement: "bottomRight",
        })

    } catch (error) { }
}


function* workerCheckSavedSanPham(action) {
    try {
        const { data = {} } = action;
        const { prevDanhSachSanPham } = data;
        const { danhSachSanPham } = yield select(state => state.reducerSanPham);
        let isSaved = false;
        if (JSON.stringify(prevDanhSachSanPham) !== JSON.stringify(danhSachSanPham))
            isSaved = true
        yield put({
            type: Actions.SAN_PHAM_CHECK_SAVED_TAKE,
            data: {
                isSaved: isSaved
            }
        })
    } catch (error) { }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function* workerMappingSanPham(action) {
    try {
        const { data = {} } = action;
        const { imageList } = data;
        let newDanhSachSanPham = [];
        imageList.forEach((imageLink, index) => {
            const sanPhamTmp = {
                id: uuidv4(),
                ten: `Sản phẩm ${index + 1}`,
                moTa: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                linkHinhAnh: imageLink,
                donGia: getRandomIntInclusive(100, 5000) * 1000,
                soLuongSanPham: getRandomIntInclusive(0, 50),
                hienThi: true
            }
            newDanhSachSanPham.push(sanPhamTmp);
        })
        yield put({
            type: Actions.SAN_PHAM_SAVE,
            data: {
                newDanhSachSanPham: newDanhSachSanPham
            }
        })
    } catch (error) { }
}

function* workerCallApi(action) {
    try {
        console.log("api called")
        let res = yield call(workerDoApiCall);
        yield put({
            type: Actions.SAN_PHAM_MAPPING,
            data: {
                imageList: res
            }
        })
    } catch (error) { }
}

function workerDoApiCall(action) {
    const options = {
        method: 'GET',
        url: 'http://shibe.online/api/shibes',
        params: {
            count: 100
        }
    };

    return axios(options).then(res => {
        return res.data;
    }).catch(error => {
        return { error: "error-catch" };
    })
}

function* workerUpdateSanPham(action) {
    try {
        const { data = {} } = action;
        let { sanPham } = data;
        const { danhSachSanPham } = yield select(state => state.reducerSanPham);
        const index = danhSachSanPham.findIndex(({ id }) => sanPham.id === id);
        let newDanhSachSanPham = [...danhSachSanPham];
        if (!sanPham.linkHinhAnh)
            sanPham.linkHinhAnh = newDanhSachSanPham[index].linkHinhAnh;
        newDanhSachSanPham[index] = sanPham;

        yield put({
            type: Actions.SAN_PHAM_SAVE,
            data: {
                newDanhSachSanPham: newDanhSachSanPham
            }
        })
    } catch (error) { }
}

