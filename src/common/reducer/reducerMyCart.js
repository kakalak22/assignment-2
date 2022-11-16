import * as Actions from "../actionTypesSearch";

const initialSate = {
    myCart: {
        danhSachSanPham: [
        ],
    }
}

export default (state = initialSate, action) => {
    switch (action.type) {
        case Actions.SAVE_ITEM_TO_CART: {
            const { data = {} } = action;
            const { newMyCart } = data;
            return {
                ...state,
                myCart: newMyCart
            }
        }
        default:
            return state;
    }
}