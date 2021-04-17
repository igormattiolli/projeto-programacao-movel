import {
  SET_FIELD_TAG,
  TAG_SAVED_SUCCESS,
  SET_ALL_FIELDS_TAG,
  RESET_FORM_TAG,
} from "../actions";

const INITIAL_STATE = {
  tagId: null,
  tagName: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FIELD_TAG:
      const clonedState = { ...state };
      clonedState[action.field] = action.value;
      return clonedState;
    case TAG_SAVED_SUCCESS:
      return INITIAL_STATE;
    case SET_ALL_FIELDS_TAG:
      return action.tag;
    case RESET_FORM_TAG:
      return INITIAL_STATE;
    default:
      return state;
  }
}
