import { notification } from "antd";
import { takeLeading, select, put, take, call } from "redux-saga/effects";
import { v4 as uuidv4 } from 'uuid';
import * as Actions from "../actionsTypeSanpham";
import axios from "axios";
import * as lodash from "lodash";
import * as DogNames from "dog-names";

export function* watcherSanPham() {
    yield takeLeading(Actions.SAN_PHAM_CREATE_NEW, workerCreateNewSanPham);
    yield takeLeading(Actions.SAN_PHAM_CHECK_SAVED, workerCheckSavedSanPham);
    yield takeLeading(Actions.SAN_PHAM_MAPPING, workerMappingSanPham);
    yield takeLeading(Actions.CALL_API, workerCallApi);
    yield takeLeading(Actions.SAN_PHAM_UPDATE, workerUpdateSanPham);
    yield takeLeading(Actions.SAN_PHAM_DELETE, workerDeleteSanPham);
    yield takeLeading(Actions.SAN_PHAM_MULTI_DELETE, workerDeleteMultiSanPham);
    yield takeLeading(Actions.SAN_PHAM_CHANGE_STATUS, workerChangeStatus);
}

const getNotification = (message, description) => {
    notification.success({
        message: message,
        description: description,
        placement: "bottomRight",
        duration: 1
    })
}

function* workerCreateNewSanPham(action) {
    try {
        const newId = uuidv4();
        const { danhSachSanPham } = yield select(state => state.reducerSanPham);
        const { data = {} } = action;

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
        if (isSaved)
            getNotification("Thành công", "Sản phẩm được tạo thành công");

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
        const { dogList } = data;
        let newDanhSachSanPham = [];
        dogList.forEach((dog, index) => {
            const sanPhamTmp = {
                // id: uuidv4(),
                // ten: dog.name,
                // moTa: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                // linkHinhAnh: dog.image.url,
                // donGia: getRandomIntInclusive(100, 5000) * 1000,
                // soLuongSanPham: getRandomIntInclusive(0, 50),
                // hienThi: true,
                // moTa: dog.bred_for
                id: uuidv4(),
                ten: dog.title,
                linkHinhAnh: dog.thumbnail,
                donGia: getRandomIntInclusive(100, 5000) * 1000,
                soLuongSanPham: getRandomIntInclusive(0, 50),
                hienThi: true,
                moTa: dog.description
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
        let res = yield call(workerDoApiCall);
        console.log(res);
        yield put({
            type: Actions.SAN_PHAM_MAPPING,
            data: {
                dogList: res
            }
        })
    } catch (error) { }
}

function workerDoApiCall(action) {
    const options = {
        method: 'GET',
        // url: 'https://api.thedogapi.com/v1/breeds',
        // params: {
        //     limit: 100
        // }
        url: "https://dummyjson.com/products",
        params: {
            limit: 100
        }
    };

    return axios(options).then(res => {
        return res.data.products;
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
        });
        yield put({
            type: Actions.SAN_PHAM_CHECK_SAVED,
            data: {
                prevDanhSachSanPham: danhSachSanPham
            }
        })

        const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
        const { isSaved } = res.data;
        if (isSaved)
            getNotification("Thành công", "Sản phẩm đã được cập nhật");
    } catch (error) { }
}

function* workerDeleteSanPham(action) {
    try {
        const { data = {} } = action;
        let { idSanPham } = data;
        const { danhSachSanPham } = yield select(state => state.reducerSanPham);
        let newDanhSachSanPham = danhSachSanPham.filter(sanPham => sanPham.id !== idSanPham);

        yield put({
            type: Actions.SAN_PHAM_SAVE,
            data: {
                newDanhSachSanPham: newDanhSachSanPham
            }
        });

        yield put({
            type: Actions.SAN_PHAM_CHECK_SAVED,
            data: {
                prevDanhSachSanPham: danhSachSanPham
            }
        });

        const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
        const { isSaved } = res.data;
        if (isSaved) getNotification("Thành công", "Đã xóa sản phẩm");

    } catch (error) { }
}

function* workerDeleteMultiSanPham(action) {
    try {
        const { data = {} } = action;
        const { sanPhamToDelete } = data;
        const { danhSachSanPham } = yield select(state => state.reducerSanPham);
        let newDanhSachSanPham = lodash.differenceBy(danhSachSanPham, sanPhamToDelete, 'id');

        yield put({
            type: Actions.SAN_PHAM_SAVE,
            data: {
                newDanhSachSanPham: newDanhSachSanPham
            }
        });

        yield put({
            type: Actions.SAN_PHAM_CHECK_SAVED,
            data: {
                prevDanhSachSanPham: danhSachSanPham
            }
        });

        const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
        const { isSaved } = res.data;
        if (isSaved) getNotification("Thành công", "Đã xóa sản phẩm được chọn");
    } catch (error) {

    }
}

function* workerChangeStatus(action) {
    try {
        const { data = {} } = action;
        const { idSanPham } = data;
        const { danhSachSanPham } = yield select(state => state.reducerSanPham);
        const index = danhSachSanPham.findIndex(sanPham => sanPham.id === idSanPham);
        console.log(index);
        let newDanhSachSanPham = lodash.cloneDeep(danhSachSanPham);
        newDanhSachSanPham[index].hienThi = !newDanhSachSanPham[index].hienThi;
        yield put({
            type: Actions.SAN_PHAM_SAVE,
            data: {
                newDanhSachSanPham: newDanhSachSanPham
            }
        });

        yield put({
            type: Actions.SAN_PHAM_CHECK_SAVED,
            data: {
                prevDanhSachSanPham: danhSachSanPham
            }
        });

        const res = yield take(Actions.SAN_PHAM_CHECK_SAVED_TAKE);
        const { isSaved } = res.data;
        console.log(isSaved);
        if (isSaved) getNotification("Thành công", "Đã thay đổi trạng thái hiển thị");
    } catch (error) { }

}