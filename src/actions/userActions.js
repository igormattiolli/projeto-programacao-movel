import firebase from "firebase";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

const userLogin = (user) => ({
  type: USER_LOGIN,
  user,
});
const userLogout = () => ({
  type: USER_LOGOUT,
});

export const Login = ({ email, password }) => (dispatch) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      const action = userLogin(user);
      dispatch(action);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
