import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  deleteComment,
  editComment,
} from "../../actions/post.actions";

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [textUpdate, setTextUpdate] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    if (textUpdate) {
      dispatch(editComment(comment.id, textUpdate)).then(() =>
        dispatch(getPosts())
      );
    }

    setEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment.id)).then(() =>
      dispatch(getPosts())
    );
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (userData.id === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [userData.id, comment.commenterId]);

  return (
    <div className="edit-comment">
      {(isAuthor || userData.admin === true) && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}

      {(isAuthor || userData.admin === true) && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Fermer
          </label>
          <br />
          <input
            type="text"
            name="text"
            defaultValue={comment.text}
            onChange={(e) => setTextUpdate(e.target.value)}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
