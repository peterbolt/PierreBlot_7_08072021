import {
  GET_COMMENTS,
  DELETE_COMMENT,
  EDIT_COMMENT,
  DELETE_POST,
  GET_POSTS,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case UPDATE_POST:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.postId);
    case GET_COMMENTS:
      return action.payload;
    case EDIT_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            text: action.payload.text,
          };
        } else return comment;
      });
    case DELETE_COMMENT:
      return state.filter((comment) => comment.id !== action.payload.commentId);
    default:
      return state;
  }
}
