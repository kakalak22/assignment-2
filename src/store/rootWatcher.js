import { all } from 'redux-saga/effects';
import { watcherSanPham } from '../admin/page/san-pham/watcher/watcherSanPham';
import { watcherSearch } from '../common/Search/watcher/watcherSearch';

export default function* rootWatcher() {
    yield all([
        watcherSanPham(),
        watcherSearch()
    ])
}