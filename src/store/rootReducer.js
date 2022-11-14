import { combineReducers } from "redux";
import reducerSanPham from "../admin/page/san-pham/reducer/reducerSanPham";
import reducersearchResults from "../common/Search/reducer/reducerSearchResults";

const rootReducer = combineReducers({
    reducerSanPham,
    reducersearchResults,
})

export default rootReducer;