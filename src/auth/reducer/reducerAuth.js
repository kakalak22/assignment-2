import * as Actions from "../actionTypesAuth";

const initialSate = {
    isUser: false,
    isAdmin: false,
    isLogin: false
}

export default (state = initialSate, action) => {
    switch (action.type) {

        case Actions.AUTH_SAVE_LOGIN_STATUS: {
            const { data = {} } = action;
            const { isAdmin, isLogin, isUser } = data;
            return {
                ...state,
                isAdmin: isAdmin,
                isLogin: isLogin,
                isUser: isUser
            }
        }



        default:
            return state;
    }
}