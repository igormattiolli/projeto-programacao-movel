import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import tagReducer from "./tagReducer";
import newProductForm from "./saveProductReducer";
import newTagForm from "./saveTagReducer";
export default combineReducers({
  user: userReducer,
  tagsList: tagReducer,
  productsList: productReducer,
  productForm: newProductForm,
  tagForm: newTagForm,
});
