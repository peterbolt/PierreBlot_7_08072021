import {
  GET_USER,
  UPLOAD_PICTURE,
  UPDATE_PSEUDO,
  DELETE_USER,
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
    case DELETE_USER:
      return state.filter((user) => user.uuid !== action.payload.userUuid);
    default:
      return state;
  }
}
