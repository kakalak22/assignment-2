import { combineReducers } from "redux";
import reducerSanPham from "../admin/page/san-pham/reducer/reducerSanPham";
import reducerSearchResults from "../common/reducer/reducerSearchResults";
import reducerAuth from "../auth/reducer/reducerAuth";
import reducerMyCart from "../common/reducer/reducerMyCart";


const rootReducer = combineReducers({
    reducerSanPham,
    reducerSearchResults,
    reducerAuth,
    reducerMyCart
})

export default rootReducer;