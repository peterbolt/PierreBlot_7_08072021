import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_PSEUDO = "UPDATE_PSEUDO";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";

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

export const updatePseudo = (userUuid, pseudo) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}users/` + userUuid,
      data: { pseudo },
    })
      .then((res) => {
        dispatch({ type: UPDATE_PSEUDO, payload: pseudo });
      })
      .catch((err) => console.log(err));
  };
};

// export const updatePassword = (userUuid, password) => {
//   return (dispatch) => {
//     return axios({
//       method: "put",
//       url: `${process.env.REACT_APP_API_URL}users/` + userUuid,
//       data: { password },
//     })
//       .then((res) => {
//         dispatch({ type: UPDATE_PASSWORD, payload: password });
//       })
//       .catch((err) => console.log(err));
//   };
// };
