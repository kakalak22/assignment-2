import * as Actions from "../actionTypesAuth";

const initialSate = {
    isAdmin: false,
    isLogin: false
}

export default (state = initialSate, action) => {
    switch (action.type) {

        case Actions.AUTH_LOGIN: {
            const { data = {} } = action;
            const { isAdmin, isLogin } = data;
            return {
                ...state,
                isAdmin: isAdmin,
                isLogin: isLogin
            }
        }



        default:
            return state;
    }
}