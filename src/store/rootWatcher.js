import { all } from 'redux-saga/effects';
import { watcherSanPham } from '../admin/page/san-pham/watcher/watcherSanPham';
import { watcherAuth } from '../auth/watcher/watcherAuth';
import { watcherMyCart } from '../common/watcher/watcherMyCart';
import { watcherSearch } from '../common/watcher/watcherSearch';


export default function* rootWatcher() {
    yield all([
        watcherSanPham(),
        watcherSearch(),
        watcherAuth(),
        watcherMyCart()
    ])
}