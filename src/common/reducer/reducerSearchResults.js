import * as Actions from "../actionTypesSearch";

const initialSate = {
    searchResults: []
}

export default (state = initialSate, action) => {
    switch (action.type) {

        case Actions.SEARCH_SAVE_RESULT: {
            const { data = {} } = action;
            const { newDanhSachSanPham, isSearchClicked } = data;
            return {
                ...state,
                searchResults: newDanhSachSanPham,
                isSearchClicked: isSearchClicked
            }
        }



        default:
            return state;
    }
}