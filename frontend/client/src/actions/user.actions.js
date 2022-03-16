import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_PSEUDO = "UPDATE_PSEUDO";
export const DELETE_USER = "DELETE_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uuid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}users/${uuid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, uuid) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}users/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}users/${uuid}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const updatePseudo = (userUuid, pseudo, userId) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}users/` + userUuid,
      data: { pseudo, userId },
    })
      .then((res) => {
        dispatch({ type: UPDATE_PSEUDO, payload: pseudo, userId });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteUser = (userUuid) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}users/` + userUuid,
    })
      .then((res) => {
        dispatch({
          type: DELETE_USER,
          payload: { userUuid },
        });
      })
      .catch((err) => console.log(err));
  };
};
