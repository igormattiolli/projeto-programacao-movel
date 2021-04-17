import firebase from "firebase";

export const SET_PRODUCTS = "SET_PRODUCTS";
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products: products,
});

export const SET_FIELD = "SET_FIELD";

export const setField = (field, value) => {
  return {
    type: SET_FIELD,
    field,
    value,
  };
};

export const PRODUCT_SAVED_SUCCESS = "PRODUCT_SAVED_SUCCESS";
export const productSavedSuccess = () => {
  return {
    type: PRODUCT_SAVED_SUCCESS,
  };
};

export const SET_ALL_FIELDS = "SET_ALL_FIELDS";
export const setAllFields = (product) => ({
  type: SET_ALL_FIELDS,
  product: product,
});

export const RESET_FORM = "RESET_FORM";
export const resetForm = () => ({
  type: RESET_FORM,
});

export const listProducts = (tag) => {
  const { currentUser } = firebase.auth();

  return async (dispatch) => {
    if (tag) {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/products`)
        .orderByChild("tagProduct")
        .equalTo(tag)
        .on("value", (snapshot) => {
          const products = snapshot.val();
          const action = setProducts(products);
          dispatch(action);
        });
    } else {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/products`)
        .on("value", (snapshot) => {
          const products = snapshot.val();
          const action = setProducts(products);
          dispatch(action);
        });
    }
  };
};

export const deleteProduct = (product) => {
  const { currentUser } = firebase.auth();
  return async (dispatch) => {
    await firebase
      .database()
      .ref(`/users/${currentUser.uid}/products/${product.productId}`)
      .remove();
  };
};

export const saveProduct = (product) => {
  const { currentUser } = firebase.auth();

  return async (dispatch) => {
    if (product.productId) {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/products/${product.productId}`)
        .set(product);
    } else {
      await firebase
        .database()
        .ref(`/users/${currentUser.uid}/products`)
        .push(product);
    }

    dispatch(productSavedSuccess());
  };
};
