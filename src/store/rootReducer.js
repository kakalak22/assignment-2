import { combineReducers } from "redux";
import reducerSanPham from "../admin/page/san-pham/reducer/reducerSanPham";
import reducerSearchResult from "../common/Search/reducer/reducerSearchResult";

const rootReducer = combineReducers({
    reducerSanPham,
    reducerSearchResult,
})

export default rootReducer;