import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";

// errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}posts/`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
