import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePseudo } from "../../actions/user.actions";
import UploadImg from "./UploadImg";
import axios from "axios";
import DeleteProfil from "./DeleteProfil";

const UpdateProfil = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [updateForm, setUpdateForm] = useState(false);

  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updatePseudo(userData.uuid, pseudo, userData.id));
    window.location = "/profil";
    setUpdateForm(false);
  };

  const handlePassUpdate = async (e) => {
    e.preventDefault();
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    passwordConfirmError.innerHTML = "";

    if (password !== controlPassword) {
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}users/${userData.uuid}`,
        withCredentials: true,
        data: {
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setFormSubmit(false);
      document.querySelector(".success").innerHTML = "Mot de passe enregistré";
    }
  };

  const cancelPass = () => {
    setFormSubmit(false);
    setPassword("");
    setControlPassword("");
  };

  return (
    <div className="profil-container">
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Informations</h3>
            <div className="info-update">
              {updateForm === false && (
                <>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.pseudo}
                  </p>
                  <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier pseudo
                  </button>
                </>
              )}
              {updateForm && (
                <>
                  <textarea
                    type="text"
                    defaultValue={userData.pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                  ></textarea>
                  <button onClick={handleUpdate}>Valider modifications</button>
                </>
              )}
            </div>
            <br />
            <div>
              {formSubmit ? (
                <>
                  <form action="" onSubmit={handlePassUpdate} id="sign-up-form">
                    {/* <label htmlFor="password">Actuel</label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password-now"
                      onChange={(e) => setNowPassword(e.target.value)}
                      value={nowPassword}
                    />
                    <div className="password error"></div>
                    <br /> */}
                    <label htmlFor="password">Nouveau</label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <div className="password error"></div>
                    <br />
                    <label htmlFor="password-conf">Confirmer</label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password-conf"
                      onChange={(e) => setControlPassword(e.target.value)}
                      value={controlPassword}
                    />
                    <div className="password-confirm error"></div>
                    <br />
                    <div className="btn-send">
                      <button className="cancel" onClick={cancelPass}>
                        Fermer
                      </button>
                      <input
                        type="submit"
                        value="Enregistrer les modifications"
                      />
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <button onClick={() => setFormSubmit(!formSubmit)}>
                    Modifier mot de passe
                  </button>
                  <div className="success"></div>
                </>
              )}
            </div>
            <>
              <DeleteProfil uuid={userData.uuid} />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
