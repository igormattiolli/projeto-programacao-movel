import firebase from "firebase";

export const SET_TAGS = "SET_TAGS";
const setTags = (tags) => ({
  type: SET_TAGS,
  tags: tags,
});

export const SET_FIELD_TAG = "SET_FIELD_TAG";

export const setFieldTag = (field, value) => {
  return {
    type: SET_FIELD_TAG,
    field,
    value,
  };
};

export const TAG_SAVED_SUCCESS = "TAG_SAVED_SUCCESS";
export const tagSavedSuccess = () => {
  return {
    type: TAG_SAVED_SUCCESS,
  };
};

export const SET_ALL_FIELDS_TAG = "SET_ALL_FIELDS_TAG";
export const setAllFieldsTag = (tag) => ({
  type: SET_ALL_FIELDS_TAG,
  tag: tag,
});

export const RESET_FORM_TAG = "RESET_FORM_TAG";
export const resetFormTag = () => ({
  type: RESET_FORM_TAG,
});

export const listTags = () => {
  const { currentUser } = firebase.auth();

  return async (dispatch) => {
    await firebase
      .database()
      .ref(`/users/${currentUser.uid}/tags`)
      .on("value", (snapshot) => {
        const tags = snapshot.val();
        const action = setTags(tags);
        dispatch(action);
      });
  };
};

export const deleteTag = (tag) => {
  const { currentUser } = firebase.auth();
  return async (dispatch) => {
    await firebase
      .database()
      .ref(`/users/${currentUser.uid}/tags/${tag.tagId}`)
      .remove();
  };
};

export const saveTag = (tag) => {
  const { currentUser } = firebase.auth();

  return async (dispatch) => {
    if (tag.tagId) {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/tags/${tag.tagId}`)
        .set(tag);
    } else {
      await firebase.database().ref(`/users/${currentUser.uid}/tags`).push(tag);
    }
    dispatch(tagSavedSuccess());
  };
};
