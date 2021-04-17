import { SET_PRODUCTS } from "../actions";

export default function (state = null, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
