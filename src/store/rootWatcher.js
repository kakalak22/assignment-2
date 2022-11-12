import { all } from 'redux-saga/effects';
import { watcherSanPham } from '../admin/page/san-pham/watcher/watcherSanPham';

export default function* rootWatcher() {
    yield all([
        watcherSanPham()
    ])
}