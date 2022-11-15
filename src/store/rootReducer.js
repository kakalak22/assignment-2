import { combineReducers } from "redux";
import reducerSanPham from "../admin/page/san-pham/reducer/reducerSanPham";
import reducerSearchResults from "../common/reducer/reducerSearchResults";
import reducerAuth from "../auth/reducer/reducerAuth";


const rootReducer = combineReducers({
    reducerSanPham,
    reducerSearchResults,
    reducerAuth
})

export default rootReducer;