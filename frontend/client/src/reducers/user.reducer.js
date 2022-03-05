import {
  GET_USER,
  UPLOAD_PICTURE,
  UPDATE_PSEUDO,
  UPDATE_PASSWORD,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case UPDATE_PSEUDO:
      return {
        ...state,
        pseudo: action.payload,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
}
