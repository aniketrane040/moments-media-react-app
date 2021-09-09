import { FOLLOW_USER, GET_USER } from "../constants/actionTypes";

const userReducer = (state = { user : null} , action) => {
    switch (action.type) {
        case GET_USER:
        case FOLLOW_USER:
            return { user : action.payload };

        default:
            return state;
    }
}

export default userReducer;