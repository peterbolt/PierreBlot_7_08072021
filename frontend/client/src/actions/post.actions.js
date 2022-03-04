import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// trends
export const GET_TRENDS = "GET_TRENDS";

// errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}posts/`)
      .then((res) => {
        const array = res.data.slice(0, num).reverse();
        dispatch({ type: GET_POSTS, payload: array });
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}posts/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      });
  };
};

export const updatePost = (postId, postUuid, posterId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}posts/${postUuid}`,
      data: { message },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_POST,
          payload: { message, postId, postUuid, posterId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}posts/${postId}`,
    })
      .then((res) => {
        dispatch({
          type: DELETE_POST,
          payload: { postId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: sortedArray });
  };
};
