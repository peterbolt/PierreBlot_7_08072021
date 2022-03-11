import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/user.actions";

const DeleteCard = (user) => {
  const dispatch = useDispatch();
  const deleteProfil = () => dispatch(deleteUser(user.uuid));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
          deleteProfil();
          window.location = "/";
        }
      }}
    >
      <button>Supprimer le compte</button>
    </div>
  );
};

export default DeleteCard;
