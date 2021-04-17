import { SET_TAGS } from "../actions";

export default function (state = null, action) {
  switch (action.type) {
    case SET_TAGS:
      return action.tags;
    default:
      return state;
  }
}
